import { nextTick } from 'vue'

export function useFocus(ellement) {
  console.log(ellement)
  nextTick(() => {
    ellement.focus()
  })
}
