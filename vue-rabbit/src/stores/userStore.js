import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/userlogin'
import { useCartStore } from '@/stores/cartStore'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore = defineStore(
  'user',
  () => {
    // 1. 定義用戶數據的 state
    const userInfo = ref({})
    const cartStore = useCartStore()

    // 2. 定義用戶數據的 action
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      userInfo.value = res.result

      if (userInfo.value.token) {
        console.log('登入成功')
        userInfo.value = res.result
      }

      // 登入成功後，合併購物車
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          }
        }),
      )
      console.log('登入成功後，合併購物車')
      cartStore.updateNewList()
    }

    // 退出清除用戶訊息
    const clearUserInfo = () => {
      userInfo.value = {}
      cartStore.clearCart()
    }

    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    }
  },
  {
    persist: true,
  },
)
