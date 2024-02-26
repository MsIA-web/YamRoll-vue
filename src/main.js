import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import SetPageVue from './components/pages/SetPage.vue'
import store from './store'

const app = createApp(App)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SetPageVue
  },
  {
    path: '/set',
    name: 'SetPage',
    component: SetPageVue
  }
]

const router = createRouter({ history: createWebHistory(), routes })

app.use(router)
app.use(autoAnimatePlugin)
app.use(store)
app.mount('#app')
