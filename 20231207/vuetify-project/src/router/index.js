// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    // 原本是Home，為什麼要改成HomeView?
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/',
    component: () => import('@/views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
