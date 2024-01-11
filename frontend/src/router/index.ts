import { createRouter, createWebHistory } from 'vue-router'

import { BASE_URL } from '@/core/config'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes
})

export default router
