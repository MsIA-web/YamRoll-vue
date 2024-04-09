import './assets/main.css'

import { createApp, ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import SetPage from './components/pages/SetPage.vue'
import RollPage from './components/pages/RollPage.vue'
import BackedRollPage from './components/pages/BackedRollPage.vue'
import SusiPage from './components/pages/SusiPage.vue'
import WokPage from './components/pages/WokPage.vue'
import AdditionallyPage from './components/pages/AdditionallyPage.vue'
import AuthorizationPage from './components/pages/AuthorizationPage.vue'
import OrderPage from './components/pages/OrderPage.vue'
import DeliveryPage from './components/pages/DeliveryPage.vue'

const app = createApp(App)

let isMenuOpen = ref(true)

let cartVisible = ref(true)

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
  },
  {
    path: '/Authorization',
    name: 'AuthorizationPage',
    component: AuthorizationPage
  },
  {
    path: '/Order',
    name: 'OrderPage',
    component: OrderPage
  },
  {
    path: '/Delivery',
    name: 'DeliveryPage',
    component: DeliveryPage
  }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  if (to.name === 'AuthorizationPage' || to.name === 'OrderPage' || to.name === 'DeliveryPage') {
    isMenuOpen.value = false
  } else {
    isMenuOpen.value = true
  }
  next()
})

router.beforeEach((to, from, next) => {
  if (to.name === 'OrderPage') {
    cartVisible.value = false
  } else {
    cartVisible.value = true
  }
  next()
})

app.provide('isMenuOpen', isMenuOpen)
app.provide('cartVisible', cartVisible)
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
