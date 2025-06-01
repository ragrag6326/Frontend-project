import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json', // headers json格式
  },
})

// 攔截器

// axios 請求攔截器
httpInstance.interceptors.request.use(
  (config) => {
    const UserStore = useUserStore()
    const token = UserStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// axios 響應式攔截器
httpInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response.status === 401) {
      // 清除本地用戶信息
      const UserStore = useUserStore()
      UserStore.clearUserInfo()
      router.push('/login')
    }
    ElMessage.error(error.response.data.msg || '服務器錯誤')
    // return Promise.reject(error)
  },
)

export default httpInstance
