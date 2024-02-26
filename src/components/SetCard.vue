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
      <img id="item" :src="imgUrl" alt="Set" />
      <b id="mass-quantity">{{ massQuantity }}</b>
      <b id="title">{{ title }}</b>
      <span id="description">{{ description }}</span>
    </div>
    <div id="card-buy">
      <b id="price">{{ price }} ₽</b>
      <img @click="onClickAdd" v-if="!isAdded" src="/buy-button.svg" alt="buy button" />
      <div id="change-order" v-if="isAdded">
        <img @click="onClickRemove" src="/minus-order.svg" alt="reduce order" />
        <span id="order">{{ reactiveOrderQuantity }}</span>
        <img @click="onClickAdd" src="/plus-order.svg" alt="increase order" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  b {
    font-weight: 600;
  }
}
#card-info {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  #item {
    width: 290px;
    height: 190px;
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
}
#card-buy {
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  img {
    cursor: pointer;
  }
}
#change-order {
  display: flex;
  justify-content: space-between;
  max-width: 120px;
  #order {
    width: 30px;
    padding: 0 10px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
