<script setup>
import axios from 'axios'
import { ref, provide, computed, inject, onMounted } from 'vue'

import AppHeader from './components/AppHeader.vue'
import AsideMenuBar from './components/AsideMenuBar.vue'
import AppFooter from './components/AppFooter.vue'
import AppDrawer from './components/AppDrawer.vue'

const store = inject('store')

const { commit } = store

const cart = store.state.cart

const addToCart = (category, item) => store.commit('addToCart', { category, item })
const removeFromCart = (category, item) => commit('removeFromCart', item)

const isCreatingOrder = ref(false)

const drawerOpen = ref(false)

const openDrawer = () => {
  drawerOpen.value = true
}

const closeDrawer = () => {
  drawerOpen.value = false
}

const totalPrice = computed(() => cart.reduce((acc, item) => acc + item.price, 0))

const cartIsEmpty = computed(() => cart.length === 0)

const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(`https://5b098b465695e1a4.mokky.dev/cart`, {
      totalPrice: totalPrice.value
    })

    cart.value = []
    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}

provide('store', store)

provide('cart', {
  cart: store.state.cart,
  openDrawer,
  closeDrawer,
  addToCart,
  removeFromCart
})

onMounted(async () => {
  const cart = await store.dispatch('fetchCart')
  console.log('app cart', cart)
  return cart
})
</script>
<template>
  <div class="wrapper">
    <div id="page-wrapper">
      <AppDrawer
        :cart="cart"
        v-if="drawerOpen"
        :total-price="totalPrice"
        @create-order="createOrder"
        :button-disabled="cartButtonDisabled"
      />
      <header ref="header">
        <AppHeader :total-price="totalPrice" @open-drawer="openDrawer" />
      </header>
      <main ref="main">
        <AsideMenuBar />
        <router-view :addToCart="addToCart" />
      </main>
    </div>
    <footer>
      <AppFooter />
    </footer>
  </div>
</template>
<style>
.wrapper {
  background-color: #fff;
  width: 90%;
  height: 95%;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 5%;
  border-radius: 0.75rem;
  position: relative;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
#page-wrapper {
  position: relative;
}
main {
  margin-top: 10px;
  position: relative;
}
</style>
