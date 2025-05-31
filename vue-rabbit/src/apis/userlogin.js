// 封装所有用户相关的接口

import httpInstance from '@/utils/http'

export const loginAPI = ({ username, password }) => {
  return httpInstance({
    url: 'http://localhost:8080/login',
    method: 'POST',
    data: {
      username,
      password,
    },
  })
}

// 猜你喜欢接口
export const getLikeListAPI = ({ limit = 4 }) => {
  return httpInstance({
    url: '/goods/relevant',
    params: {
      limit,
    },
  })
}
