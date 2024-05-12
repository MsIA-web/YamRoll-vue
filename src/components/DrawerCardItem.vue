<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  imgUrl: String,
  title: String,
  price: Number,
  orderQuantity: Number,
  category: String,
  onClickRemove: Function
})
</script>

<template>
  <div id="item">
    <div id="item-card">
      <img id="item-img" :src="imgUrl" alt="item image" />
      <div id="item-info">
        <div id="title-counter" class="size-16">
          <b>{{ title }}</b>
          <span id="counter" class="size-16">x{{ orderQuantity }}</span>
        </div>
        <div id="price-remove">
          <span id="price" class="size-16">{{ price }} ₽</span>
          <img
            id="remove-button"
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
@import '@/assets/mixin.scss';

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
}
#item-img {
  max-width: 80px;
  max-height: 80px;
  min-width: 60px;
  min-height: 60px;
  border-radius: 0.75rem;
}
#item-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
  gap: 10px;
}
#title-counter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
#counter {
  padding-right: 30px;
}
#price-remove {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
#remove-button {
  padding-right: 20px;
  @include buttonAnimation();
}
</style>
