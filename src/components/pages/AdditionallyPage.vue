<script setup>
import axios from 'axios'
import { onMounted, inject } from 'vue'

import AdditionallyList from '../AdditionallyList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const { items, updateItemsList } = inject('items')

const fetchAdditionally = async (category) => {
  try {
    const localAdditionally = localStorage.getItem(category)
    if (localAdditionally) {
      const data = JSON.parse(localAdditionally)
      updateItemsList({ data, category: 'additionally' })
    } else {
      const response = await axios.get(`https://5b098b465695e1a4.mokky.dev/additionally`)
      const data = response.data
      updateItemsList({ data, category: 'additionally' })
    }
  } catch (err) {
    console.log('fetchAdditionally action failed:', err)
  }
}

onMounted(async () => {
  await fetchAdditionally('additionally')
  const updateAdditionally = items.value.additionally
  updateAdditionally.forEach((itemInItems) => {
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
  <AdditionallyList :additionally="items.additionally" @add-to-cart="addToCart" @remove-from-cart="removeFromCart" />
</template>

<style lang="scss"></style>
