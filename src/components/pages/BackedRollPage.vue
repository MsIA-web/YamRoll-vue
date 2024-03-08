<script setup>
import axios from 'axios'
import { onMounted, inject } from 'vue'

import BackedRollList from '../BackedRollList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const { items, updateItemsList } = inject('items')

const fetchBackedRolls = async (category) => {
  try {
    const localSets = localStorage.getItem(category)
    if (localSets) {
      const data = JSON.parse(localSets)
      updateItemsList({ data, category: 'backedRolls' })
    } else {
      const response = await axios.get(`https://5b098b465695e1a4.mokky.dev/backed-rolls`)
      const data = response.data
      updateItemsList({ data, category: 'backedRolls' })
    }
  } catch (err) {
    console.log('fetchSets action failed:', err)
  }
}

onMounted(async () => {
  await fetchBackedRolls('backedRolls')
  const updateBackedRolls = items.value.rolls
  updateBackedRolls.forEach((itemInItems) => {
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
  <BackedRollList
    :backedRolls="items.backedRolls"
    @add-to-cart="addToCart"
    @remove-from-cart="removeFromCart"
  />
</template>
