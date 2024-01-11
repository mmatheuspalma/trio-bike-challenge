import './assets/scss/main.scss'

import { plugin as MetaPlugin, createMetaManager } from 'vue-meta'

import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import store from '@/core/store'

const app = createApp(App)

app.use(store).use(router).use(createMetaManager()).use(MetaPlugin)

app.mount('#app')
