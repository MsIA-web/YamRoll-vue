<script setup></script>

<template>
  <div id="footer">
    <ul id="footer-links">
      <li id="links-company">
        <span id="about-us">О нас</span>
      </li>
      <li id="links-feedback">
        <span id="contacts">Контакты</span>
        <span id="report">Сообщить об ошибке</span>
      </li>
      <li id="links-inform">
        <span id="links-privacy-policcy">Политика конфиденциальности </span>
        <span id="links-user-agreement">Пользовательское соглашение</span>
      </li>
    </ul>
    <ul id="footer-details">
      <li id="cooperate">© 2024, YamRoll</li>
      <li id="payment-systems">
        <img id="visa" src="../../public/visa-logo.svg" alt="visa" />
        <img id="mastercard" src="../../public/mastercard-logo.svg" alt="mastercard" />
        <img id="mir" src="../../public/mir-logo.svg" alt="mir" />
      </li>
      <li id="social-network">
        <img src="../../public/vk-logo.svg" alt="vk" />
        <img src="../../public/telegram-logo.svg" alt="telegram" />
        <img src="../../public/instagram-logo.svg" alt="instagram" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
#footer {
  display: flex;
  padding: 5px;
  margin-top: 80px;
  background-color: #ee575e;
  flex-direction: column;
  color: #fff;
  #footer-links {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
    li {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      text-align: center;
      font-weight: 600;
    }
  }
  #footer-details {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    #cooperate {
      display: flex;
      align-items: end;
    }
    #payment-systems {
      img {
        max-width: 100px;
        height: 30px;
        padding: 0 5px;
      }
    }
    #social-network {
      display: flex;
      gap: 0.5rem;
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
