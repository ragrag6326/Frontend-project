// import { crypto } from 'crypto-js'; // 浏览器可能限制，见下方注意事项
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios';

// 註冊 sandbox 取得
// https://developers-pay.line.me/zh/sandbox#create-sandbox-account
const channel_id = ''; // 填入 channel_id
const channel_secret = ''; // 填入 channel_secret

import HmacSHA256 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'

function generateHMAC(message, secret) {
  const hash = HmacSHA256(message, secret)
  return Base64.stringify(hash)
}

// API Authentication
function generateHeaders(body, channelSecret, url) {
    const nonce = uuidv4();
    const stringToSign = `${channelSecret}${url}${body}${nonce}`;
    const signature = generateHMAC(stringToSign, channelSecret)
    
    return {
        "Content-Type": "application/json",
        "X-LINE-ChannelId": channel_id,
        "X-LINE-Authorization-Nonce": nonce,
        "X-LINE-Authorization": signature,
    };
}

export async function paymentRequest( orderId , skus) {
    const url = "/v3/payments/request";
    const totalAmount = skus.reduce((sum, item) => sum + (item.curPrice * item.quantity), 0)

    const body = {
        "amount": totalAmount,
        "currency": "TWD",
        "orderId": orderId ,

        "packages": skus.map((item, index) => ({
            "id": `pkg_${index + 1}`,
            "amount": item.curPrice * item.quantity,
            "products": [{        
                "id": item.spuId,
                "name": item.name,
                "imageUrl": item.image,
                "quantity": item.quantity,
                "price": item.curPrice
            }]
        })),
        "options": {
            "display": {"locale": "zh_TW"}
        },
        "redirectUrls": {
            // 付款成功要跳轉的網頁
            "confirmUrl": "http://localhost:5173/paycallback?payResult=true",
            // 付款失敗要跳轉的網頁
            "cancelUrl": "http://localhost:5173/paycallback",
        },
    };
    
    // Convert body to JSON string
    const body_json = JSON.stringify(body);
    console.log(body_json);
    
    // 呼叫剛剛所定義的 API Authentication generate_headers 函式
    const headers = generateHeaders(body_json, channel_secret, url);
    
    try {
        const response = await axios.post('/api/line-pay/v3/payments/request', body_json, { headers });
        console.log(JSON.stringify(response.data, null, 2));

        if ( response?.data?.returnCode == "0000" ) {
            console.log(response.data.returnMessage);
            return response.data.info.paymentUrl.web
        } 

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}
