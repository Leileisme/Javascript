// Composables
import { createRouter, createWebHistory, START_LOCATION } from 'vue-router'
import { useUserStore } from '@/store/user'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()
  // 如果是進來的第一次跳頁
  if (from === START_LOCATION) {
    // 如果網址有 token
    if (to.query.token) {
      // 將 token 存入 user store
      user.token = to.query.token
    }
    // 如果 user store 有 token，就取得使用者資料
    if (user.token) {
      // await user.getProfile()
    }
  }

  // if (!user.isLogin && to.meta.login) {
  //   next('/login')
  // }

  next()
})

export default router
