/**
 * 接口请求专用防抖
 * @param {Function} fn 要防抖的接口函数
 * @param {number} delay 延迟毫秒 默认300
 * @returns {Function} 防抖后的函数
 */
export function debounce(fn, delay) {
  let timer = null

  return function () {
    return new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(async () => {
        const res = await fn()
        resolve(res)
        timer = null
      }, delay)
    })
  }
}
