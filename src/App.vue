<script setup>
import axios from 'axios'
import { ref, provide, computed, onMounted } from 'vue'

import AppHeader from './components/AppHeader.vue'
import AsideMenuBar from './components/AsideMenuBar.vue'
import AppFooter from './components/AppFooter.vue'
import AppDrawer from './components/AppDrawer.vue'

const cart = ref([])
const items = ref({
  sets: []
})
const addToCart = ({ category, item }) => {
  const cartIndex = cart.value.findIndex((cartItem) => cartItem.id === item.id)
  const categoryItemIndex = items.value[category].findIndex(
    (categoryItem) => categoryItem.id === item.id
  )
  const updateCart = { ...cart.value[cartIndex] }
  let updateItem = { ...items.value[category][categoryItemIndex] }
  if (cartIndex !== -1 && categoryItemIndex !== -1) {
    updateItem.orderQuantity++
    updateCart.orderQuantity++

    items.value[category].splice(categoryItemIndex, 1, updateItem)
    cart.value.splice(cartIndex, 1, updateCart)
  } else {
    cart.value.push({
      ...item,
      orderQuantity: 1,
      isAdded: true
    })
    updateItem = {
      ...item,
      orderQuantity: 1,
      isAdded: true
    }
    items.value[category].splice(categoryItemIndex, 1, updateItem)
  }

  localStorage.setItem(category, JSON.stringify(items.value[category]))
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const removeFromCart = ({ category, item }) => {
  const cartIndex = cart.value.findIndex((cartItem) => cartItem.id === item.id)
  const categoryItemIndex = items.value[category].findIndex(
    (categoryItem) => categoryItem.id === item.id
  )
  const updateItem = { ...items.value[category][categoryItemIndex] }
  const updateCart = { ...items.value[category][cartIndex] }
  if (updateItem.orderQuantity > 1 && updateCart.orderQuantity > 1) {
    updateItem.orderQuantity--
    updateCart.orderQuantity--
    cart.value.splice(cartIndex, 1, updateCart)
    items.value[category].splice(categoryItemIndex, 1, updateItem)
  } else {
    updateItem.isAdded = false
    updateItem.orderQuantity = 0

    cart.value.splice(cartIndex, 1)
    items.value[category].splice(categoryItemIndex, 1, updateItem)
  }
  localStorage.setItem(category, JSON.stringify(items.value[category]))
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const isCreatingOrder = ref(false)

const drawerOpen = ref(false)

const openDrawer = () => {
  drawerOpen.value = true
}

const closeDrawer = () => {
  drawerOpen.value = false
}

const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => {
    return item.orderQuantity * item.price + acc
  }, 0)
)

const cartIsEmpty = computed(() => cart.value.length === 0)

const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(`https://5b098b465695e1a4.mokky.dev/cart`, {
      totalPrice: totalPrice.value
    })
    cart.value = []
    Object.keys(items.value).forEach((categoryKey) => {
      items.value[categoryKey].forEach((element) => {
        element.orderQuantity = 0
        element.isAdded = false
      })
    })
    localStorage.clear()
    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}

const updateItemsList = ({ data, category }) => {
  items.value[category] = data
  localStorage.setItem(category, JSON.stringify(data))
}

const updateCart = (localCart) => {
  cart.value = localCart
  localStorage.setItem('cart', JSON.stringify(localCart))
}

const fetchCart = async () => {
  try {
    const localCart = JSON.parse(localStorage.getItem('cart')) || []
    updateCart(localCart)
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  try {
    await fetchCart()
  } catch (err) {
    console.log('Error with rendering', err)
  }
})

provide('cart', {
  cart,
  openDrawer,
  closeDrawer,
  addToCart,
  removeFromCart
})
provide('items', {
  items,
  updateItemsList
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
        <router-view :add-to-cart="addToCart" :remove-from-cart="removeFromCart" />
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
