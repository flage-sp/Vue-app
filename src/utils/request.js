import { useuserstore } from '@/stores/index'

import router from '@/router'

const uesstore = useuserstore()
export const baseurl = 'http://big-event-vue-api-t.itheima.net'
import axios from 'axios'
const instance = axios.create({
  baseURL: baseurl,
  timeout: 5000,
})
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = uesstore.token

    return config
  },
  function (error) {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error)
    if (error.response.status === 401) {
      uesstore.token = ''
      window.alert('登录过期，请重新登录')
      router.push('/LoginPage')
    }
    return Promise.reject(error)
  },
)
export default instance
