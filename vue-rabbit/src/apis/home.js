import httpInstance from '@/utils/http'

export function getBannerAPI() {
  return httpInstance({
    url: '/home/banner',
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
