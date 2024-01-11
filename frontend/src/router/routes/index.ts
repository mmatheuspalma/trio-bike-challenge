import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/Error/NotFoundView.vue'
import type { RouteRecordRaw } from 'vue-router'
import modules from './modules'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  ...modules,
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView
  }
]

export default routes
