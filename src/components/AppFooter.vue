<script setup>
import { useRoute } from 'vue-router'
const isActive = (route) => {
  const currentRoute = useRoute()
  return currentRoute.path === route
}
</script>

<template>
  <div id="footer">
    <ul id="footer-links">
      <li id="links-company" class="links-column">
        <router-link :to="{ name: 'AboutUsPage' }">
          <span id="about-us" class="size-16" :class="{ active: isActive('/AboutUs') }">О нас</span>
        </router-link>
      </li>
      <li id="links-feedback" class="links-column">
        <router-link :to="{ name: 'ContactsPage' }">
          <span id="contacts" class="size-16 links" :class="{ active: isActive('/Contacts') }"
            >Контакты</span
          >
        </router-link>
        <router-link :to="{ name: 'ReportPage' }">
          <span id="report" class="size-16 links" :class="{ active: isActive('/Report') }"
            >Сообщить об ошибке</span
          >
        </router-link>
      </li>
      <li id="links-inform" class="links-column">
        <router-link :to="{ name: 'PrivacyPolicyPage' }">
          <span
            id="links-privacy-policy"
            class="size-16 links"
            :class="{ active: isActive('/PrivacyPolicy') }"
            >Политика конфиденциальности
          </span>
        </router-link>
        <router-link :to="{ name: 'UserAgreementPage' }">
          <span
            id="links-user-agreement"
            class="size-16 links"
            :class="{ active: isActive('/UserAgreement') }"
            >Пользовательское соглашение</span
          >
        </router-link>
      </li>
    </ul>
    <ul id="footer-details">
      <li id="cooperate">© 2024, YamRoll</li>
      <li id="payment-systems">
        <img id="visa" class="payment-img" src="../../public/visa-logo.svg" alt="visa" />
        <img
          id="mastercard"
          class="payment-img"
          src="../../public/mastercard-logo.svg"
          alt="mastercard"
        />
        <img id="mir" class="payment-img" src="../../public/mir-logo.svg" alt="mir" />
      </li>
      <li id="social-network">
        <a href="https://vk.com/"
          ><img class="social-img" src="../../public/vk-logo.svg" alt="vk"
        /></a>
        <a href="https://web.telegram.org/k/"
          ><img class="social-img" src="../../public/telegram-logo.svg" alt="telegram"
        /></a>
        <img
          v-if="false"
          class="social-img"
          src="../../public/instagram-logo.svg"
          alt="instagram"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/mixin.scss';

#footer {
  @include flexColumn();
  margin-top: 80px;
  background-color: #ee575e;
  border-bottom: 4px solid #ee575e;
}
#footer-links {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  line-height: 1.5;
}
.links-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  font-weight: 600;
}
span {
  display: inline-block;
  color: #fff;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
    color: #000000;
    text-decoration: underline;
  }
}
.size-16.active {
  color: #000000;
  text-decoration: underline;
}
#footer-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#cooperate {
  display: flex;
  align-items: end;
}
#payment-systems {
  display: flex;
}
.payment-img {
  max-width: 100px;
  height: 30px;
  padding: 0 5px;
}

#social-network {
  display: flex;
  gap: 0.5rem;
}
.social-img {
  width: 30px;
  height: 30px;
  @include hoverAnimation();
}
</style>
