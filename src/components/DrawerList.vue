<script setup>
import DrawerCardItem from './DrawerCardItem.vue'
import { inject } from 'vue'

const { cart, removeFromCart } = inject('cart')
</script>

<template>
  <div id="cart-list">
    <DrawerCardItem
      v-for="item in cart"
      :key="item.id"
      :imgUrl="item.imgUrl"
      :title="item.title"
      :order-quantity="item.orderQuantity"
      :price="item.price"
      :category="item.category"
      @on-click-remove="() => removeFromCart({ category: item.category, item })"
    />
  </div>
</template>

<style lang="scss" scoped>
#cart-list {
  max-height: 505px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
