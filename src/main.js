import './assets/main.css'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 1. 创建 VNode：h(标签名, 属性, 子元素/内容)

// 2. 创建应用并挂载 → 渲染到页面

import App from './App.vue'
import router from './router'
/* const vnode = h(App, '我是 h 创建的 div')
const dd = {
  render(ctx, h) {
    console.log(ctx, h)
    return vnode
  },
} */
const app = createApp(App)
app.directive('focus', {
  mounted(el, binding) {
    if (binding.value) {
      el.style.backgroundColor = 'red'
    }
  },
})
app.use(createPinia().use(persist))
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
// 挂载到 #app
