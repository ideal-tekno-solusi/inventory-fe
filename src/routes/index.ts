import { authGuard } from '@/guards/auth.guard'
import HomePage from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from './auth'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
