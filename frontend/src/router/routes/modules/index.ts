import type { RouteRecordRaw } from 'vue-router'
import { default as details } from './details'

export default [
  // module routes are merged here
  ...details
] as RouteRecordRaw[]
