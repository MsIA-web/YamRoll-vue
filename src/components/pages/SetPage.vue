<script setup>
import { onMounted, inject } from 'vue'

import SetList from '../SetList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const store = inject('store')
const { dispatch, state } = store

onMounted(async () => {
  await dispatch('fetchSets', 'sets')
  const updateSets = state.items.sets
  updateSets.forEach((itemInItems) => {
    const cartItemIndex = cart.findIndex((cartItem) => cartItem.id === itemInItems.id)
    if (cartItemIndex !== -1) {
      const cartItem = cart[cartItemIndex]
      itemInItems.orderQuantity = cartItem.orderQuantity
      itemInItems.isAdded = cartItem.isAdded
    } else {
      itemInItems.orderQuantity = 0
      itemInItems.isAdded = false
    }
  })
})

const setsAddToCart = (item) => {
  addToCart('sets', item)
}

const setsRemoveFromCart = (item) => {
  removeFromCart({ category: 'sets', item })
}
</script>

<template>
  <SetList
    :sets="state.items.sets"
    @sets-add-to-cart="setsAddToCart"
    @sets-remove-from-cart="setsRemoveFromCart"
  />
</template>

<style lang="scss"></style>
