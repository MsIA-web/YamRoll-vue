<script setup>
import { watch, ref } from 'vue'

const props = defineProps({
  id: Number,
  imgUrl: String,
  massQuantity: String,
  title: String,
  description: String,
  price: Number,
  orderQuantity: Number,
  isAdded: Boolean,
  category: String,
  onClickAdd: Function,
  onClickRemove: Function
})

const reactiveOrderQuantity = ref(props.orderQuantity)

watch(
  () => props.orderQuantity,
  (newValue) => {
    reactiveOrderQuantity.value = newValue
  }
)
</script>

<template>
  <div id="card">
    <div id="card-info">
      <img id="item" :src="imgUrl" alt="image item" />
      <b id="mass-quantity" class="size-14">{{ massQuantity }}</b>
      <b id="title" class="size-20">{{ title }}</b>
      <span id="description" class="size-16">{{ description }}</span>
    </div>
    <div id="card-buy">
      <b id="price">{{ price }} ₽</b>
      <img
        class="cart-buttons"
        @click="onClickAdd"
        v-if="!isAdded"
        src="/buy-button.svg"
        alt="buy button"
      />
      <div id="change-order" v-if="isAdded">
        <img
          class="cart-buttons-alt"
          @click="onClickRemove"
          src="/minus-order.svg"
          alt="reduce order"
        />
        <span id="order">{{ reactiveOrderQuantity }}</span>
        <img
          class="cart-buttons-alt"
          @click="onClickAdd"
          src="/plus-order.svg"
          alt="increase order"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/mixin.scss';

#card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#title {
  font-weight: 600;
}
#card-info {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#item {
  width: 100%;
  height: 100%;
}
#mass-quantity {
  margin-top: 10px;
  font-size: 14px;
}
#title {
  margin-top: 5px;
  font-size: 20px;
}
#description {
  margin-top: 5px;
  text-align: left;
  line-height: 1.5;
}
#card-buy {
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.cart-buttons,
.cart-buttons-alt {
  cursor: pointer;
  @include buttonAnimation();
}
#change-order {
  display: flex;
  justify-content: space-between;
  max-width: 120px;
}
#order {
  width: 30px;
  padding: 0 10px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
