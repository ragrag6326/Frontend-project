import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import ElementPlus from 'element-plus'
import zhTw from 'element-plus/es/locale/lang/zh-tw'

import App from './App.vue'
import router from './router'

// 引入初始化樣式文件
import '@/styles/common.scss'

const app = createApp(App)
const pinia = createPinia()

// 引入懶加載插件
import { lazyPlugin } from '@/directives/'

// 全局組件
import { componentPlugin } from '@/components'

// 註冊持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.use(ElementPlus, {
  locale: zhTw,
})

app.mount('#app')
