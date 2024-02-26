<script setup>
import { inject } from 'vue'

const { closeDrawer } = inject('cart')
</script>

<template>
  <div id="drawer-header">
    <img @click="closeDrawer" src="../../public//arrow-next.svg" alt="" />
    <span id="cart-name">Корзина</span>
  </div>
</template>

<style lang="scss" scoped>
#drawer-header {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  gap: 0.5rem;
  padding: 5px;
  img {
    margin-left: 15px;
    width: 25px;
    height: 25px;
    opacity: 40%;
    transition-duration: 150ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(-0.25rem);
    transition-property: transform;
    cursor: pointer;
  }
  img:hover {
    opacity: 100%;
    transition-property: all;
    transition-duration: 150ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(-0.5rem);
  }
  #cart-name {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
