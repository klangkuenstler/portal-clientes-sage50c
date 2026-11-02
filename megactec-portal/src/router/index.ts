import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to, from, savedPosition) =>
    savedPosition ?? (to.path === from.path ? false : { top: 0 }),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { title: 'Visão geral' },
    },
    {
      path: '/reparacoes',
      name: 'repairs',
      component: () => import('@/views/RepairsView.vue'),
      meta: { title: 'Reparações' },
    },
    {
      path: '/reparacoes/:id',
      name: 'repair-detail',
      component: () => import('@/views/RepairDetailView.vue'),
      meta: { title: 'Detalhe da reparação' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: 'Página não encontrada' },
    },
  ],
})

router.afterEach((to, from) => {
  document.title = `${String(to.meta.title)} · Megactec`
  if (to.path !== from.path) {
    void nextTick(() => document.getElementById('main-content')?.focus({ preventScroll: true }))
  }
})

export default router
