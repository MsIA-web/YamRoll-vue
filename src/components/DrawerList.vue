<script setup>
import DrawerCardItem from './DrawerCardItem.vue'
import { inject } from 'vue'

const { cart, removeFromCart } = inject('cart')
console.log('cart in drawerList', cart)
</script>

<template>
  <div id="cart-list">
    <DrawerCardItem
      v-for="item in cart"
      :key="item.id"
      :imgUrl="item.imgUrl"
      :title="item.title"
      :price="item.price"
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>

<style lang="scss" scoped></style>
