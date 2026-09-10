import { createRouter, createWebHistory } from 'vue-router'
import { modules } from '../config/modules'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { title: '首页' },
    },
    // 各模块页面（骨架阶段统一占位，随模块 change 逐步实现）
    ...modules.map((m) => ({
      path: m.path,
      name: m.module,
      component: () => import('../views/Placeholder.vue'),
      meta: { title: m.title, module: m.module },
    })),
  ],
})

router.afterEach((to) => {
  document.title = `${String(to.meta.title ?? '')} - HeGui 数据平台`
})

export default router
