<script setup>
import { inject } from 'vue'

const menuOpen = inject('menuOpen')
</script>

<template>
  <aside>
    <button
      id="aside-menu-open"
      :class="{ 'no-border-radius': menuOpen }"
      @click="menuOpen = !menuOpen"
    >
      <div id="button-container">
        <div id="line-button">
          <img src="../../public/line-menu.svg" alt="line" />
          <img src="../../public/line-menu.svg" alt="line" />
          <img src="../../public/line-menu.svg" alt="line" />
        </div>
        <span id="button-name">МЕНЮ</span>
      </div>
    </button>
    <transition name="fade">
      <ul v-if="menuOpen" id="aside-menu">
        <router-link :to="{ name: 'SetPage' }">
          <li class="menu-item">
            <img class="icon" src="../../public/sets-icon.png" alt="sets icon" />
            <span class="menu-text">СЕТЫ</span>
          </li>
        </router-link>
        <router-link :to="{ name: 'RollsPage' }">
          <li class="menu-item">
            <img class="icon" src="../../public/roll-icon.png" alt="rolls icon" />
            <span class="menu-text">РОЛЛЫ</span>
          </li>
        </router-link>
        <router-link :to="{ name: 'BackedRollsPage' }">
          <li class="menu-item">
            <img class="icon" src="../../public/baked-rolls-icon.png" alt="baked rolls icon" />
            <span class="menu-text">ТЁПЛЫЕ РОЛЛЫ</span>
          </li>
        </router-link>
        <router-link :to="{ name: 'SusiPage' }">
          <li class="menu-item">
            <img class="icon" src="../../public/susi-icon.png" alt="susi icon" />
            <span class="menu-text">СУШИ</span>
          </li>
        </router-link>
        <router-link :to="{ name: 'WokPage' }">
          <li class="menu-item">
            <img class="icon" src="../../public/wok-icon.png" alt="wok icon" />
            <span class="menu-text">WOK</span>
          </li>
        </router-link>
        <router-link :to="{ name: 'AdditionallyPage' }">
          <li class="menu-item">
            <img class="icon" src="../../public/additionally-icon.png" alt="additionally icon" />
            <span class="menu-text">ПЛЮС</span>
          </li>
        </router-link>
      </ul>
    </transition>
  </aside>
</template>

<style scoped lang="scss">
@import '@/assets/mixin.scss';

aside {
  display: flex;
  flex-direction: column;
  min-width: 60px;
  float: left;
  cursor: pointer;
  z-index: 1;
  position: sticky;
  top: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease !important;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0 !important;
}
#aside-menu-open {
  background-color: #ee575e;
  border-end-end-radius: 20px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  transition: 0.5 ease;
}
.no-border-radius {
  border-end-end-radius: 0 !important;
  border-end-start-radius: 0 !important;
}
#button-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  transition: transform 0.3s ease;
  @media (hover: hover) {
    &:hover {
      transform: scale(1.05);
    }
  }
  &:active {
    transform: scale(1);
    transition: transform 0.1s ease;
  }
  @media (hover: none) {
    &:active {
      background: #ea676e;
      border-end-end-radius: 20px;
      border-end-start-radius: 20px;
    }
  }
}
#line-button {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-top: 5px;
}
#button-name {
  font-weight: 600;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 16px;
  padding: 5px 0;
}
#aside-menu {
  width: 60px;
  transition: width 0.3s ease;
  background-color: #ee575e;
  border-end-end-radius: 20px;
}
.menu-item {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-end-end-radius: 20px;
  overflow: hidden;
  background-color: #ee575e;

  transition: filter 0.3s ease;
  @media (hover: hover) {
    &:hover {
      width: 250px;
    }
  }
  @media (hover: none) {
    &:active {
      background: #ea676e;
      border-end-end-radius: 20px;
      border-end-start-radius: 20px;
    }
  }
}
.icon {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  transition: filter 0.3s ease;
  @media (hover: hover) {
    &:hover {
      transform: scale(1.05);
    }
  }
  &:active {
    transform: scale(1);
    transition: transform 0.1s ease;
  }
}
.menu-text {
  font-weight: 600;
  text-align: center;
}
</style>
