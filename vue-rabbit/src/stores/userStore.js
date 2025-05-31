import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/userlogin'

export const useUserStore = defineStore(
  'user',
  () => {
    // 1. 定義用戶數據的 state
    const userInfo = ref({})

    // 2. 定義用戶數據的 action
    const getUserInfo = async ({ username, password }) => {
      const res = await loginAPI({ username, password })
      userInfo.value = res
    }

    // 退出清除用戶訊息
    const clearUserInfo = () => {
      userInfo.value = {}
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
