<script setup>
import { inject } from 'vue'
const cartVisible = inject('cartVisible')
const emit = defineEmits(['openDrawer'])
</script>

<template>
  <div class="header">
    <div class="logo-phone">
      <router-link :to="{ name: 'Home' }">
        <img src="../../public/logo-horizontal.png" alt="logotype" />
      </router-link>
      <a href="tel:+79998887766">+7 (999) 888-77-66</a>
    </div>
    <div class="action-delivery">
      <span id="action">АКЦИИ</span>
      <router-link :to="{ name: 'DeliveryPage' }">
        <span id="delivery">ДОСТАВКА</span>
      </router-link>
    </div>
    <div class="account-cart">
      <router-link :to="{ name: 'AuthorizationPage' }">
        <img id="account" src="../../public/account.svg" alt="account" />
      </router-link>
      <img
        v-if="cartVisible"
        @click="emit('openDrawer')"
        id="cart"
        src="../../public/cart.svg"
        alt="cart"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@mixin flex-center {
  display: flex;
  align-items: center;
}

.header {
  @include flex-center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  padding: 5px 10px;
  img {
    cursor: pointer;
  }
}
.logo-phone {
  @include flex-center;
  gap: 1rem;
  img {
    width: 130px;
    height: 60px;
  }
}
.action-delivery {
  @include flex-center;
  gap: 1rem;
}
.account-cart {
  @include flex-center;
  gap: 1rem;
  #account,
  #cart {
    width: 30px;
    height: 30px;
  }
}
</style>
