<script setup>
import DrawerHeadVue from './DrawerHead.vue'
import DrawerList from './DrawerList.vue'

defineProps({
  totalPrice: Number,
  buttonDisabled: Boolean
})

const emit = defineEmits(['createOrder'])
</script>

<template>
  <div id="cart-overlay">
    <div id="shadow"></div>
    <div id="cart-content">
      <DrawerHeadVue />
      <DrawerList />
      <div id="cart-bottom">
        <div id="price">
          <span id="price-text">Итого:</span>
          <div id="dashed-border"></div>
          <span id="total-price">{{ totalPrice }} ₽</span>
        </div>
        <button id="buy" @click="() => emit('createOrder')" :disabled="buttonDisabled">
          ОФОРМИТЬ ЗАКАЗ
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#cart-overlay {
  width: 100%;
  height: calc(100% + 50px);
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: end;
}
#shadow {
  width: 100%;
  height: 100%;
  background-color: #000000a8;
}
#cart-content {
  height: 100%;
  width: 30%;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
}
#cart-bottom {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  #price {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    white-space: nowrap;
  }
  #dashed-border {
    border-bottom: 1px dashed rgba(0, 0, 0, 0.4);
    width: 100%;
  }
  #buy {
    font-family: 'Noto Sans JP', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
    background-color: #ee575e;
    width: 180px;
    padding: 10px;
    border-radius: 1rem;
    align-self: center;
  }
  #buy:disabled {
    opacity: 40%;
  }
}
</style>
