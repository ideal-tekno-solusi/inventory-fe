import { authGuard } from '@/guards/authGuard'
import HomePage from '@/pages/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from './auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/a',
      name: 'homea',
      component: HomePage,
    },
    {
      path: '',
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'home',
          component: HomePage,
        },
      ],
    },
    ...authRoutes,
  ],
})

// guards
router.beforeEach(authGuard)

export default router
