import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const { BASE_PATH } = process.env

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/components/Layouts/NormalLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/Dashboard.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(BASE_PATH),
  routes,
})

export default router
