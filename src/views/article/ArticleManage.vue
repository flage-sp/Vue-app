<script setup>
import FormWork from '@/component/FormWork.vue'
/* import { nextTick, ref, onMounted } from 'vue'

const scrollindex = ref(0)


onMounted(() => {
  nextTick(() => {
    const el = document.querySelector('.el-main')
    const ells = document.querySelector('.el-card__header')
    if (el) {
      el.addEventListener('scroll', (e) => {
        if (e.target.scrollTop > 40 && e.target.scrollTop < 200)
          scrollindex.value = e.target.scrollTop
        ells.style.backgroundColor = '#fff'
        ells.style.top = '60px'
        console.log(e.target.scrollTop)
        if (e.target.scrollTop <= 40) ells.style.top = '100px'
      })
    }
  })
}) */
</script>

<template>
  <div class="common-layout">
    <FormWork :message="[]" :getlist="() => {}" :top="'30px'">
      <template #text>首页</template>
      <template #tred><el-button type="primary">添加文章</el-button></template>
    </FormWork>
  </div>
</template>

<style scoped>
:deep(.el-card__header) {
  position: absolute;
  width: 100%;
  z-index: 999;
  top: 60px;
  background-color: #fff;
  transition: all 0.3s ease;
}
:deep(.card-header) {
  width: 81%;
  display: flex;
  justify-content: space-between;
}
:deep(.el-card__body) {
  margin-top: 0px;
}
</style>
