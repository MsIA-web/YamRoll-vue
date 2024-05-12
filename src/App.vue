<script setup>
import axios from 'axios'
import { ref, provide, computed, onMounted, inject } from 'vue'

import AppHeader from './components/AppHeader.vue'
import AsideMenuBar from './components/AsideMenuBar.vue'
import AppFooter from './components/AppFooter.vue'
import AppDrawer from './components/AppDrawer.vue'

const isMenuOpen = inject('isMenuOpen')
const menuOpen = ref(false)

const cart = ref([])

const items = ref({
  sets: [],
  rolls: [],
  backedRolls: [],
  susi: [],
  wok: [],
  additionally: []
})
const numberOfItemsInTheCart = ref(0)

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
  numberOfItemsInTheCart.value++
  console.log(numberOfItemsInTheCart.value)

  localStorage.setItem('counter in cart', JSON.stringify(numberOfItemsInTheCart.value))
  localStorage.setItem(category, JSON.stringify(items.value[category]))
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const removeFromCart = ({ category, item }) => {
  const cartIndex = cart.value.findIndex((cartItem) => cartItem.id === item.id)
  const categoryItemIndex = items.value[category].findIndex(
    (categoryItem) => categoryItem.id === item.id
  )
  const updateItem = { ...items.value[category][categoryItemIndex] }
  const updateCart = { ...cart.value[cartIndex] }
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
  if (numberOfItemsInTheCart.value > 0) {
    numberOfItemsInTheCart.value--
  } else {
    numberOfItemsInTheCart.value = 0
  }
  console.log(numberOfItemsInTheCart.value)
  localStorage.setItem('counter in cart', JSON.stringify(numberOfItemsInTheCart.value))
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

    const getCartItems = () => {
      return cart.value
    }
    console.log(getCartItems())
    const orderItems = []
    getCartItems().forEach((item) => {
      orderItems.push({
        parentId: item.id,
        title: item.title,
        orderQuantity: item.orderQuantity
      })
    })

    const { data } = await axios.post(`https://5b098b465695e1a4.mokky.dev/cart`, {
      id: '',
      totalPrice: totalPrice.value,
      order: orderItems
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
    numberOfItemsInTheCart.value = JSON.parse(localStorage.getItem('counter in cart')) || 0
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
provide('createOrder', createOrder)
provide('menuOpen', menuOpen)
</script>
<template>
  <div class="wrapper" @click="menuOpen = false">
    <div id="left-sidel" class="aside"></div>
    <div id="right-side" class="aside"></div>
    <div id="midle-side">
      <div id="midle">
        <AppDrawer
          :cart="cart"
          v-if="drawerOpen"
          :total-price="totalPrice"
          @closeDrawer="closeDrawer"
          :button-disabled="cartButtonDisabled"
        />
        <header ref="header">
          <AppHeader
            :total-price="totalPrice"
            @open-drawer="openDrawer"
            :number-of-items-in-the-cart="numberOfItemsInTheCart"
          />
        </header>
        <main ref="main">
          <AsideMenuBar v-if="isMenuOpen" @click.stop />
          <router-view />
        </main>
      </div>
      <footer>
        <AppFooter />
      </footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/mixin.scss';

.wrapper {
  background-color: #fff;
  width: 100%;
  min-height: 100vh;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 0.75rem;
  position: relative;
}
#midle-side {
  position: relative;
  order: 1;
  flex-grow: 8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 90%;
}
.aside {
  flex-grow: 1;
  width: 5%;
  height: auto;
  background-image: url(../../public/background.png);
}
#right-side {
  order: 2;
}
#midle {
  position: relative;
}
main {
  margin-top: 10px;
  position: relative;
}
</style>
