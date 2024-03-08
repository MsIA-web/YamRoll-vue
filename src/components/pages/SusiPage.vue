<script setup>
import axios from 'axios'
import { onMounted, inject } from 'vue'

import SusiList from '../SusiList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const { items, updateItemsList } = inject('items')

const fetchSusi = async (category) => {
  try {
    const localSusi = localStorage.getItem(category)
    if (localSusi) {
      const data = JSON.parse(localSusi)
      updateItemsList({ data, category: 'susi' })
    } else {
      const response = await axios.get(`https://5b098b465695e1a4.mokky.dev/susi`)
      const data = response.data
      updateItemsList({ data, category: 'susi' })
    }
  } catch (err) {
    console.log('fetchSusi action failed:', err)
  }
}

onMounted(async () => {
  await fetchSusi('susi')
  const updateSusi = items.value.susi
  updateSusi.forEach((itemInItems) => {
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
  <SusiList :susi="items.susi" @add-to-cart="addToCart" @remove-from-cart="removeFromCart" />
</template>
