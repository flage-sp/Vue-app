import './assets/main.css'

import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(createPinia().use(persist))
app.use(router)
app.use(ElementPlus, {
  locale: zhCn, // 使用中文语言包
})

app.mount('#app')
