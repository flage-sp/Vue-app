<script setup></script>
<template>
  <router-view name="sidebar"></router-view>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@use '@/style/fonte.scss';
@use '@/style/icon.scss';
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  overflow: hidden; /* 可选，防止出现滚动条 */
}
/* 全局隐藏滚动条 */
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background: transparent;
}
</style>
