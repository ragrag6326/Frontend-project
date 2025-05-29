import httpInstance from '@/utils/http'

/**
 * @description: 獲取倫波圖
 * @param {*}
 * @return {*}
 */
export function getBannerAPI(params = {}) {
  // 莫認為1 商品為2
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite,
    },
  })
}

/**
 * @description: 獲取新鮮好務
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return httpInstance({
    url: '/home/new',
  })
}

/**
 * @description: 獲取熱門品
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
  return httpInstance({
    url: '/home/hot',
  })
}

/**
 * @description: 獲取所有商品
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods',
  })
}
