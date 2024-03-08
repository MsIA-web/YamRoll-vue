<script setup>
import axios from 'axios'
import { onMounted, inject } from 'vue'

import RollList from '../RollList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const { items, updateItemsList } = inject('items')

const fetchRolls = async (category) => {
  try {
    const localRolls = localStorage.getItem(category)
    if (localRolls) {
      const data = JSON.parse(localRolls)
      updateItemsList({ data, category: 'rolls' })
    } else {
      const response = await axios.get(`https://5b098b465695e1a4.mokky.dev/rolls`)
      const data = response.data
      updateItemsList({ data, category: 'rolls' })
    }
  } catch (err) {
    console.log('fetchRolls action failed:', err)
  }
}

onMounted(async () => {
  await fetchRolls('rolls')
  const updateRolls = items.value.rolls
  updateRolls.forEach((itemInItems) => {
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
  <RollList :rolls="items.rolls" @add-to-cart="addToCart" @remove-from-cart="removeFromCart" />
</template>
