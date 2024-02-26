<script setup>
import SetCard from './SetCard.vue'

defineProps({
  sets: Array
})

const emit = defineEmits(['setsAddToCart', 'setsRemoveFromCart'])
</script>

<template>
  <div id="content">
    <SetCard
      v-for="item in sets"
      :key="item.id"
      :imgUrl="item.imgUrl"
      :massQuantity="item.massQuantity"
      :title="item.title"
      :description="item.description"
      :price="item.price"
      :orderQuantity="item.orderQuantity"
      :onClickAdd="() => emit('setsAddToCart', item)"
      :onClickRemove="() => emit('setsRemoveFromCart', item)"
      :isAdded="item.isAdded"
    />
  </div>
</template>

<style lang="scss" scoped>
#content {
  display: grid;
  grid-template-columns: repeat(3, minmax(290px, 300px));
  gap: 1.25rem;
  justify-content: space-evenly;
}
</style>
