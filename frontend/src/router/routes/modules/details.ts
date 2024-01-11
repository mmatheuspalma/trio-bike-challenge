import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/details/:id',
    name: 'details',
    component: () => import('@/views/BikeDetailsView.vue')
  }
] as RouteRecordRaw[]
