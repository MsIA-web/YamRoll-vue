<script setup>
import SetCard from './SetCard.vue'

defineProps({
  backedRolls: Array
})

const emit = defineEmits(['addToCart', 'removeFromCart'])
</script>

<template>
  <div id="content">
    <SetCard
      v-for="item in backedRolls"
      :key="item.id"
      :imgUrl="item.imgUrl"
      :massQuantity="item.massQuantity"
      :title="item.title"
      :description="item.description"
      :price="item.price"
      :orderQuantity="item.orderQuantity"
      :isAdded="item.isAdded"
      :category="item.category"
      :onClickAdd="() => emit('addToCart', { category: item.category, item })"
      :onClickRemove="() => emit('removeFromCart', { category: item.category, item })"
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
