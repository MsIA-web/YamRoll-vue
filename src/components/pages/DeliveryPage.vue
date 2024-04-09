<script setup></script>

<template>
  <div id="delivery">
    <h2 id="delivery-header">Условия доставки</h2>
    <div id="info-slogan">
      <div id="info">
        <div id="region">
          <h3>Регион доставки</h3>
          <p class="text">Мы осуществляем доставку роллов по городу XYZ.</p>
        </div>
        <div id="price">
          <h3>Стоимость доставки</h3>
          <p class="text">Доставка роллов осуществляется бесплатно по всему городу.</p>
        </div>
        <div id="time">
          <h3>Время доставки</h3>
          <p class="text">
            Оперативная доставка роллов осуществляется в течение 1 часа с момента оформления заказа.
          </p>
        </div>
        <div id="payment">
          <h3>Оплата</h3>
          <p class="text">Мы принимаем оплату:</p>
          <ul>
            <li>Наличными курьеру при получении заказа</li>
            <li>Банковской картой онлайн на сайте при оформлении заказа</li>
          </ul>
        </div>
        <div id="contacts">
          <h3>Контакты</h3>
          <p class="text">
            Если у вас возникли вопросы или требуется дополнительная информация, вы можете связаться
            с нами:
          </p>
          <ul>
            <li>Телефон: +7 (XXX) XXX-XX-XX</li>
            <li>Электронная почта: info@deliveryrolls.ru</li>
          </ul>
        </div>
      </div>
      <p id="slogan">Мы гарантируем качественную доставку и свежие роллы прямо к вашему столу!</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#delivery {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 10px;
}
#delivery-header {
  font-size: 20px;
  font-weight: 900;
}
#info-slogan {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
#info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
#slogan {
  margin: auto;
}
.text {
  padding-top: 10px;
}
h3 {
  font-size: 18px;
}

ul {
  padding-left: 30px;
}
ul li {
  padding-top: 10px;
  list-style: disc;
}
</style>
