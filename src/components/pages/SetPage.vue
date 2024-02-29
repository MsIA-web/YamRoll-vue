<script setup>
import axios from 'axios'
import { onMounted, inject } from 'vue'

import SetList from '../SetList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const { items, updateItemsList } = inject('items')

const fetchSets = async (category) => {
  try {
    const localSets = localStorage.getItem(category)
    if (localSets) {
      const data = JSON.parse(localSets)
      updateItemsList({ data, category: 'sets' })
    } else {
      const response = await axios.get(`https://5b098b465695e1a4.mokky.dev/sets`)
      const data = response.data
      updateItemsList({ data, category: 'sets' })
    }
  } catch (err) {
    console.log('fetchSets action failed:', err)
  }
}

onMounted(async () => {
  await fetchSets('sets')
  const updateSets = items.value.sets
  updateSets.forEach((itemInItems) => {
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
  <SetList :sets="items.sets" @add-to-cart="addToCart" @remove-from-cart="removeFromCart" />
</template>

<style lang="scss"></style>
