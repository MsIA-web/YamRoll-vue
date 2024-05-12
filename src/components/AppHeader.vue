<script setup>
import { inject, provide, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
const cartVisible = inject('cartVisible')
const emit = defineEmits(['openDrawer'])

const breakPointViewport = ref(false)
defineProps({
  numberOfItemsInTheCart: Number
})
let isUpdatingViewport = false

const updateViewport = () => {
  if (isUpdatingViewport) {
    return
  }
  isUpdatingViewport = true
  breakPointViewport.value = window.matchMedia('(max-width: 768px)').matches
  setTimeout(() => {
    isUpdatingViewport = false
  }, 10)
}
updateViewport()
window.addEventListener('resize', () => {
  updateViewport()
})

const curentRoute = useRoute()

const isActive = (route) => {
  return curentRoute.path === route
}

const updateCartCounter = (currentPath) => {
  const targetPath = '/Order'
  const cartCounter = document.getElementById('counter')
  if (currentPath === targetPath) {
    cartCounter.style.display = 'none'
  } else {
    cartCounter.style.display = 'block'
  }
}

onMounted(() => {
  updateCartCounter(curentRoute.path)

  watch(curentRoute, (to, from) => {
    updateCartCounter(to.path)
  })
})

provide('mobileView', breakPointViewport)
</script>

<template>
  <div class="header">
    <div class="logo-phone">
      <router-link :to="{ name: 'Home' }">
        <img
          v-if="!breakPointViewport"
          id="logo-horizontal"
          class="logo"
          src="../../public/logo-horizontal.png"
          alt="logotype"
        />
        <img
          v-else
          id="logo-vertical"
          class="logo"
          src="../../public/logo-vertical.png"
          alt="logotype"
        />
      </router-link>
      <a id="phone" class="size-20" href="tel:+79998887766">+7 (999) 888-77-66</a>
    </div>
    <div class="action-delivery">
      <router-link :to="{ name: 'PromotionsPage' }">
        <span id="action" class="size-20" :class="{ active: isActive('/Promotions') }">АКЦИИ</span>
      </router-link>
      <router-link :to="{ name: 'DeliveryPage' }">
        <span id="delivery" class="size-20" :class="{ active: isActive('/Delivery') }"
          >ДОСТАВКА</span
        >
      </router-link>
    </div>
    <div class="account-cart">
      <router-link :to="{ name: 'AuthorizationPage' }">
        <div id="account-area">
          <svg
            id="account"
            width="30px"
            height="30px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#000000"
              d="M16 7.992C16 3.58 12.416 0 8 0S0 3.58 0 7.992c0 2.43 1.104 4.62 2.832 6.09.016.016.032.016.032.032.144.112.288.224.448.336.08.048.144.111.224.175A7.98 7.98 0 0 0 8.016 16a7.98 7.98 0 0 0 4.48-1.375c.08-.048.144-.111.224-.16.144-.111.304-.223.448-.335.016-.016.032-.016.032-.032 1.696-1.487 2.8-3.676 2.8-6.106zm-8 7.001c-1.504 0-2.88-.48-4.016-1.279.016-.128.048-.255.08-.383a4.17 4.17 0 0 1 .416-.991c.176-.304.384-.576.64-.816.24-.24.528-.463.816-.639.304-.176.624-.304.976-.4A4.15 4.15 0 0 1 8 10.342a4.185 4.185 0 0 1 2.928 1.166c.368.368.656.8.864 1.295.112.288.192.592.24.911A7.03 7.03 0 0 1 8 14.993zm-2.448-7.4a2.49 2.49 0 0 1-.208-1.024c0-.351.064-.703.208-1.023.144-.32.336-.607.576-.847.24-.24.528-.431.848-.575.32-.144.672-.208 1.024-.208.368 0 .704.064 1.024.208.32.144.608.336.848.575.24.24.432.528.576.847.144.32.208.672.208 1.023 0 .368-.064.704-.208 1.023a2.84 2.84 0 0 1-.576.848 2.84 2.84 0 0 1-.848.575 2.715 2.715 0 0 1-2.064 0 2.84 2.84 0 0 1-.848-.575 2.526 2.526 0 0 1-.56-.848zm7.424 5.306c0-.032-.016-.048-.016-.08a5.22 5.22 0 0 0-.688-1.406 4.883 4.883 0 0 0-1.088-1.135 5.207 5.207 0 0 0-1.04-.608 2.82 2.82 0 0 0 .464-.383 4.2 4.2 0 0 0 .624-.784 3.624 3.624 0 0 0 .528-1.934 3.71 3.71 0 0 0-.288-1.47 3.799 3.799 0 0 0-.816-1.199 3.845 3.845 0 0 0-1.2-.8 3.72 3.72 0 0 0-1.472-.287 3.72 3.72 0 0 0-1.472.288 3.631 3.631 0 0 0-1.2.815 3.84 3.84 0 0 0-.8 1.199 3.71 3.71 0 0 0-.288 1.47c0 .352.048.688.144 1.007.096.336.224.64.4.927.16.288.384.544.624.784.144.144.304.271.48.383a5.12 5.12 0 0 0-1.04.624c-.416.32-.784.703-1.088 1.119a4.999 4.999 0 0 0-.688 1.406c-.016.032-.016.064-.016.08C1.776 11.636.992 9.91.992 7.992.992 4.14 4.144.991 8 .991s7.008 3.149 7.008 7.001a6.96 6.96 0 0 1-2.032 4.907z"
            />
          </svg>
        </div>
      </router-link>
      <div id="cart-area">
        <div  id="counter">
          {{ numberOfItemsInTheCart }}
        </div>
        <svg
          v-if="cartVisible"
          @click="emit('openDrawer')"
          id="cart"
          width="800px"
          height="800px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:svg="http://www.w3.org/2000/svg"
        >
          <defs id="defs2" />

          <g id="layer1" transform="translate(36,-244)">
            <path
              d="m -31.371094,255.00586 c -1.625564,0 -2.864805,1.51618 -2.589843,3.10351 l 2.27539,13.13477 c 0.27851,1.60776 1.701467,2.76172 3.314453,2.76172 h 16.767578 c 1.6146248,0 3.0129936,-1.16108 3.3105472,-2.74805 a 1.0001,1.0001 0 0 0 0.00195,-0.0137 l 2.2734375,-13.12109 v -0.002 c 0.2984384,-1.59859 -0.9594241,-3.11523 -2.5859375,-3.11523 z m 0,2 h 22.7675784 c 0.4158021,0 0.6977222,0.33936 0.6210937,0.74805 a 1.0001,1.0001 0 0 0 -0.00195,0.0137 l -2.2753911,13.12695 c -0.124292,0.65116 -0.680335,1.11133 -1.34375,1.11133 h -16.767578 c -0.666611,0 -1.23316,-0.46316 -1.34375,-1.10156 l -2.27539,-13.13672 c -0.07374,-0.42569 0.201707,-0.76172 0.61914,-0.76172 z"
              id="path1"
              fill="#000000"
              style="
                fill-rule: evenodd;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-miterlimit: 4.1;
                -inkscape-stroke: none;
              "
            />

            <path
              d="m -24.695312,246.07227 a 1,1 0 0 0 -0.556641,0.52734 l -4,9 a 1,1 0 0 0 0.507812,1.32031 1,1 0 0 0 1.320313,-0.50781 l 4,-9 a 1,1 0 0 0 -0.507813,-1.32031 1,1 0 0 0 -0.763671,-0.0195 z"
              id="path2"
              fill="#000000"
              style="
                fill-rule: evenodd;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-miterlimit: 4.1;
                -inkscape-stroke: none;
              "
            />

            <path
              d="m -15.279297,246.07227 a 1,1 0 0 0 -0.763672,0.0195 1,1 0 0 0 -0.507812,1.32031 l 4,9 a 1,1 0 0 0 1.318359,0.50781 1,1 0 0 0 0.507813,-1.32031 l -4,-9 a 1,1 0 0 0 -0.554688,-0.52734 z"
              id="path3"
              fill="#000000"
              style="
                fill-rule: evenodd;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-miterlimit: 4.1;
                -inkscape-stroke: none;
              "
            />

            <path
              d="m -20,259.00586 a 1,1 0 0 0 -1,1 v 8 a 1,1 0 0 0 1,1 1,1 0 0 0 1,-1 v -8 a 1,1 0 0 0 -1,-1 z"
              id="path4"
              fill="#000000"
              style="
                fill-rule: evenodd;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-miterlimit: 4.1;
                -inkscape-stroke: none;
              "
            />

            <path
              d="m -24,259.00586 a 1,1 0 0 0 -1,1 v 8 a 1,1 0 0 0 1,1 1,1 0 0 0 1,-1 v -8 a 1,1 0 0 0 -1,-1 z"
              id="path5"
              fill="#000000"
              style="
                fill-rule: evenodd;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-miterlimit: 4.1;
                -inkscape-stroke: none;
              "
            />

            <path
              d="m -16,259.00586 a 1,1 0 0 0 -1,1 v 8 a 1,1 0 0 0 1,1 1,1 0 0 0 1,-1 v -8 a 1,1 0 0 0 -1,-1 z"
              id="path6"
              fill="#000000"
              style="
                fill-rule: evenodd;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-miterlimit: 4.1;
                -inkscape-stroke: none;
              "
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/mixin.scss';

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  padding: 5px 10px;
}
img {
  cursor: pointer;
}
.logo-phone {
  @include flex-center;
}
#logo-horizontal {
  width: 130px;
  height: 60px;
}
#logo-vertical {
  height: 60px;
}
.logo {
  transition: transform 0.3s ease;
  @media (hover: hover) {
    @include hoverAnimation();
  }
  @media (hover: none) {
    transform: scale(1.05);
  }
}
#phone {
  @include hoverAnimation();
  line-height: 1.5;
}
.action-delivery {
  @include flex-center;
}
#action {
  @include hoverAnimation();
  &.active {
    color: #ee575e;
    text-decoration: underline;
  }
}

#delivery {
  @include hoverAnimation();
  &.active {
    color: #ee575e;
    text-decoration: underline;
  }
}
.account-cart {
  @include flex-center;
}
#account-area {
  @include hoverAnimation();
}
#account {
  width: 30px;
  height: 30px;
  &:hover path {
    fill: #ee575e;
  }
}
#cart-area {
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  position: relative;
  svg {
    @include hoverAnimation();
  }
}
#counter {
  position: absolute;
  top: 0;
  right: 5px;
  z-index: 1;
  background-color: #ee575e;
  border-radius: 100%;
  padding: 2px 5px !important;
  font-size: 16px;
  color: white;
}
#cart {
  width: 30px;
  height: 30px;
  &:hover #path1,
  &:hover #path2,
  &:hover #path3,
  &:hover #path4,
  &:hover #path5,
  &:hover #path6 {
    fill: #ee575e;
  }
}
</style>
