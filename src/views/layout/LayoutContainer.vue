<script setup>
import { chebian } from '@/api/index'
import { useuserstore } from '@/stores/index'
import { ref, watch, onMounted } from 'vue'
import {
  Management,
  Promotion,
  Avatar,
  User,
  Switch,
  EditPen,
  ArrowDown,
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import lottie from 'lottie-web'
import tushucopy from '@/assets/tushucopy.json'
const router = useRouter() // 路由实例，用于导航
const route = useRoute() // 当前路由信息对象
const resd = ref([])
const usestore = useuserstore()
const lottieBox = ref(null)
const headers = ref('')
const scrollindex = ref('')
onMounted(() => {
  lottieBox.value = lottie.loadAnimation({
    container: lottieBox.value,
    animationData: tushucopy,
    renderer: 'svg',
    loop: true,
    autoplay: true,
  })
})
const qw = async () => {
  const res = await chebian()
  resd.value = res
}
qw()
const exit = async () => {
  await ElMessageBox.confirm('你确定要要退出吗？', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  usestore.removetoken()
  ElMessage.success('退出成功')
  router.push('/LoginPage')
}
const eft = ref(usestore.fileser)
// 监听路由变化
watch(
  () => route.path,
  (newParams) => {
    eft.value = newParams
    router.push(newParams)
    usestore.addreser(newParams)
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside height="auto" width="auto">
        <div class="ui" ref="lottieBox"></div>
        <el-menu
          :default-active="eft"
          class="el-menu-vertical-demo"
          text-color="white"
          background-color="black"
          active-text-color="#409EFF"
          router
        >
          <el-menu-item index="/ArticleManage">
            <el-icon><Management /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/ArticleChannel">
            <el-icon><Promotion /></el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Avatar /></el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/userProfile" v-if="resd.data"
                ><el-icon><User /></el-icon>{{ resd.data[2].children[0].title }}</el-menu-item
              >
              <el-menu-item index="/UserPawssword" v-if="resd.data"
                ><el-icon><Switch /></el-icon>{{ resd.data[2].children[2].title }}</el-menu-item
              >
              <el-menu-item index="/UserAvatar" v-if="resd.data"
                ><el-icon><EditPen /></el-icon>{{ resd.data[2].children[1].title }}</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div>
            用户姓名:
            <strong>{{ usestore.from.username }}</strong>
          </div>

          <el-dropdown>
            <div class="el-dropdown-link">
              <img :src="usestore.files.user_pic" alt="" v-if="usestore.files.user_pic" />
              <img src="@/assets/default-745c3d16.png" alt="" v-else />
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu :z-index="99999">
                <el-dropdown-item @click="router.push('/userProfile')">基本资料</el-dropdown-item>
                <el-dropdown-item @click="router.push('/UserAvatar')">更换头像</el-dropdown-item>
                <el-dropdown-item @click="router.push('/UserPawssword')">重置密码</el-dropdown-item>
                <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <div class="headers" ref="headers" v-if="scrollindex > 10"></div>
        <el-main width="auto">
          <router-view v-slot="props">
            <transition name="route-fade">
              <component :is="props.Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.headers {
  width: 1284.85px;
  height: 100px;
  box-sizing: border-box;
  position: absolute;
  top: 75px;
  margin: 0px 20px 0px 20px;
  z-index: 999;
}

.el-aside {
  width: 220px;
  height: 100vh; /* 使用视口高度 */
}

.el-main {
  max-height: calc(100vh - 60px);
  overflow-y: auto; /* 添加垂直滚动 */
}

.ui {
  height: 25%;
  background-color: black;
  svg {
    background-color: black;
  }
}

.el-menu-vertical-demo {
  background-color: black;
  height: 75%;
}
.el-header {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-dropdown img {
  width: 40px;
  height: 40px;
}
.el-main .el-card .el-card__footer {
  height: 100px;
}
.el-main .el-card .el-card__body {
  height: 100px;
}
.el-main .el-card .el-card__header {
  height: 100px;
}
.el-table__body-wrapper {
  height: 1000px;
}
/* 过渡动画
/* 1. 过渡前/离开后：初始状态（透明/偏移20px） */
.route-fade-enter-from,
.route-fade-leave-to {
  opacity: 0; /* 透明 */
  transform: translateX(50px); /* 向右偏移20px，营造滑入效果 */
}
/* 过渡过程
/* 2. 过渡过程：平滑动画（时长0.3s，缓动效果） */
.route-fade-enter-active,
.route-fade-leave-active {
  transition: all 0.3s ease; /* all 表示同时过渡 opacity 和 transform */
  /* 防止动画期间页面抖动，加个定位上下文 */
  position: relative;
}

/* 3. 进入后/离开前：结束状态（正常显示） */
.route-fade-enter-to,
.route-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
