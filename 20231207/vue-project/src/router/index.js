import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // createWebHistory 網路會找不到路徑
  // http://localhouse/about -> 它會去找index/about，但我們只有一個index，從首頁可以進去，直接找網址找不到
  // createWebHashHistory 會在網址加一個錨點(#) 讓伺服器找的到(像id那樣)
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '國家公園介紹網'
      }
    },
    {
      path: '/yangmingshan',
      name: 'yangmingshan',
      component: () => import('@/views/YangmingshanView.vue'),
      // 進入這頁前執行
      // beforeEnter() {},
      // 進入這頁後執行
      // afterEnter() {},
      meta: {
        title: '國家公園介紹網 | 陽明山'
      }
    },
    {
      path: '/sheipa',
      name: 'sheipa',
      component: () => import('@/views/SheipaView.vue')
    }
  ]
})
// 進入每一頁前執行
// to = 目標頁面
// from = 來源頁面
// next = 重新導向
router.beforeEach((to, from, next) => {
  if (to.name === 'sheipa') {
    next('/')
  } else {
    next()
  }
})

// 進入每一頁後執行
// to = 目標頁面
// from = 來源頁面
router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
