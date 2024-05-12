<script setup>
import SetCard from './SetCard.vue'

defineProps({
  wok: Array
})

const emit = defineEmits(['addToCart', 'removeFromCart'])
</script>

<template>
  <div id="content">
    <SetCard
      v-for="item in wok"
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
@import '@/assets/mixin.scss';

#content {
  @include gridMesh(3)
}
</style>
