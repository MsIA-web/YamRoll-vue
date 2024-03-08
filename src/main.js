import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import SetPage from './components/pages/SetPage.vue'
import RollPage from './components/pages/RollPage.vue'
import BackedRollPage from './components/pages/BackedRollPage.vue'
import SusiPage from './components/pages/SusiPage.vue'
import WokPage from './components/pages/WokPage.vue'
import AdditionallyPage from './components/pages/AdditionallyPage.vue'

const app = createApp(App)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SetPage
  },
  {
    path: '/sets',
    name: 'SetPage',
    component: SetPage
  },
  {
    path: '/rolls',
    name: 'RollsPage',
    component: RollPage
  },
  {
    path: '/backedRolls',
    name: 'BackedRollsPage',
    component: BackedRollPage
  },
  {
    path: '/susi',
    name: 'SusiPage',
    component: SusiPage
  },
  {
    path: '/wok',
    name: 'WokPage',
    component: WokPage
  },
  {
    path: '/additionally',
    name: 'AdditionallyPage',
    component: AdditionallyPage
  }
]

const router = createRouter({ history: createWebHistory(), routes })

app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
