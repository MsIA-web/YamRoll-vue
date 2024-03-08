<script setup>
import axios from 'axios'
import { onMounted, inject } from 'vue'

import WokList from '../WokList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const { items, updateItemsList } = inject('items')

const fetchWok = async (category) => {
  try {
    const localWok = localStorage.getItem(category)
    if (localWok) {
      const data = JSON.parse(localWok)
      updateItemsList({ data, category: 'wok' })
    } else {
      const response = await axios.get(`https://5b098b465695e1a4.mokky.dev/wok`)
      const data = response.data
      updateItemsList({ data, category: 'wok' })
    }
  } catch (err) {
    console.log('fetchWok action failed:', err)
  }
}

onMounted(async () => {
  await fetchWok('wok')
  const updateWok = items.value.wok
  updateWok.forEach((itemInItems) => {
    const cartItemIndex = cart.value.findIndex((cartItem) => cartItem.id === itemInItems.id)
    if (cartItemIndex === -1) {
      itemInItems.orderQuantity = 0
      itemInItems.isAdded = false
    } else {
      cart.value[cartItemIndex].orderQuantity = itemInItems.orderQuantity
      cart.value[cartItemIndex].isAdded = itemInItems.isAdded
    }
  })
})
</script>

<template>
  <WokList :wok="items.wok" @add-to-cart="addToCart" @remove-from-cart="removeFromCart" />
</template>

<style lang="scss"></style>
