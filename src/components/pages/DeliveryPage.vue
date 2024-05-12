<script setup></script>

<template>
  <div id="delivery">
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
    <p id="slogan">Мы гарантируем качественную доставку и свежие роллы прямо к вашему столу!</p>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/mixin.scss';
#delivery {
  @include flexColumn();
}
h3 {
  @include header(18px);
}
.text {
  padding-top: 10px;
  padding-left: 10px;
}
ul {
  @include ulChanged();
}
#slogan {
  margin: auto;
}
</style>
