<script setup> 
import FormWork from '@/component/FormWork.vue';
</script>

<template>
  <div class="common-layout">
     <FormWork>
       <template #text>首页</template>
        <template #tred><el-button type="primary" >添加文章</el-button></template>
     </FormWork>      
  </div>
</template>

<style scoped>
 
</style>