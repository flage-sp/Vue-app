import { createRouter, createWebHistory } from 'vue-router'
import { useuserstore } from '@/stores/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/LoginPage',
      components: {
        sidebar: () => import('@/views/login/LoginPage.vue'),
      },
    },
    {
      path: '/',
      components: {
        sidebar: () => import('@/views/layout/LayoutContainer.vue'),
      },
      redirect: '/ArticleManage',
      children: [
        {
          path: '/UserAvatar',
          component: () => import('@/views/user/UserAvatar.vue'),
        },
        {
          path: '/UserPawssword',
          component: () => import('@/views/user/UserPawssword.vue'),
        },
        {
          path: '/userProfile',
          component: () => import('@/views/user/UserProfile.vue'),
        },
        {
          path: '/ArticleChannel',
          component: () => import('@/views/article/ArticleChannel.vue'),
        },
        {
          path: '/ArticleManage',
          component: () => import('@/views/article/ArticleManage.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const usestore = useuserstore()

  if (!usestore.token && to.path !== '/LoginPage') {
    next('/LoginPage')
  } else {
    next()
  }
})

export default router
