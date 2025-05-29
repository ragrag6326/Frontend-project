import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhTw from 'element-plus/es/locale/lang/zh-tw'

import App from './App.vue'
import router from './router'

// 引入初始化樣式文件
import '@/styles/common.scss'

const app = createApp(App)

// 引入懶加載插件
import { lazyPlugin } from '@/directives/'

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(ElementPlus, {
  locale: zhTw,
})

app.mount('#app')
