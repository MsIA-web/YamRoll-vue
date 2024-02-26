<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
</script>

<template>
  <aside>
    <button id="aside-menu-open" class="icon-button" @click="menuOpen = !menuOpen">
      <div id="line-button">
        <img src="../../public/line-menu.svg" alt="line" />
        <img src="../../public/line-menu.svg" alt="line" />
        <img src="../../public/line-menu.svg" alt="line" />
      </div>
      <span>МЕНЮ</span>
    </button>
    <ul v-if="menuOpen">
      <router-link :to="{ name: 'SetPage' }">
        <li>
          <img class="icon" src="../../public/sets-icon.png" alt="sets icon" />
          <span class="menu-text">СЕТЫ</span>
        </li>
      </router-link>
      <li>
        <img class="icon" src="../../public/roll-icon.png" alt="rolls icon" />
        <span class="menu-text">РОЛЛЫ</span>
      </li>
      <li>
        <img class="icon" src="../../public/baked-rolls-icon.png" alt="baked rolls icon" />
        <span class="menu-text">ТЁПЛЫЕ РОЛЛЫ</span>
      </li>
      <li>
        <img class="icon" src="../../public/susi-icon.png" alt="susi icon" />
        <span class="menu-text">СУШИ</span>
      </li>
      <li>
        <img class="icon" src="../../public/wok-icon.png" alt="wok icon" />
        <span class="menu-text">WOK</span>
      </li>
      <li>
        <img class="icon" src="../../public/additionally-icon.png" alt="additionally icon" />
        <span class="menu-text">ДОПОЛНИТЕЛЬНО</span>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
aside {
  min-width: 60px;
  background-color: #ee575e;
  border-end-end-radius: 20px;
  float: left;
  cursor: pointer;
  z-index: 1;
  position: sticky;
  top: 0;
}
#aside-menu-open {
  display: flex;
  flex-direction: column;
  width: 60px;
  height: 60px;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  span {
    font-weight: 600;
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 16px;
  }
}
#line-button {
  display: flex;
  flex-direction: column;
  gap: 5px;

  img {
    width: 24px;
  }
}
ul {
  width: 60px;
  li {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    gap: 1rem;
    overflow: hidden;
    background-color: #ee575e;
    border-end-end-radius: 20px;
  }
  li img {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
  }
  li:hover {
    width: 250px;
  }
}
.menu-text {
  font-weight: 600;
}
.icon:hover {
  animation-duration: 0.3s;
  animation-name: icons;
}
@keyframes icons {
  0% {
  }

  100% {
    transform: scale(1.05);
  }
}
.icon-button:hover {
  border-end-end-radius: 20px;
  transform: scale(1.05);
}
</style>
