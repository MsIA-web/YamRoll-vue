<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  imgUrl: String,
  title: String,
  price: Number,
  orderQuantity: Number
})
</script>

<template>
  <div id="item">
    <div id="item-card">
      <img id="item-img" :src="imgUrl" alt="item image" />
      <div id="item-info">
        <div id="title-counter">
          <b>{{ title }}</b>
          <span id="counter">x{{ orderQuantity }}</span>
        </div>
        <div id="price-remove">
          <span id="price">{{ price }} ₽</span>
          <img
            @click="emit('onClickRemove')"
            src="../../public/remove-item-cart.svg"
            alt="Remove item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#item {
  padding: 10px;
  display: flex;
  flex-direction: column;
}
#item-card {
  display: flex;
  border: 1px solid #00000040;
  border-radius: 0.75rem;
  gap: 20px;
  #item-img {
    width: 80px;
    height: 80px;
    border-radius: 0.75rem;
  }
  #item-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-grow: 1;
    #title-counter {
      display: flex;
      align-items: center;
      justify-content: space-between;
      #counter {
        padding-right: 30px;
      }
    }
    #price-remove {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        padding-right: 20px;
      }
    }
  }
}
</style>
