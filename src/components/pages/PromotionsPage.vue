<script setup></script>
<template>
  <div id="promotions">
    <div id="delicious-lunch">
      <h3 class="promotions-header">Вкусный обед</h3>
      <ul class="promotions-list">
        <li><strong>Время акции: </strong>с 11:00 до 13:00 по будням.</li>
        <li><strong>Предложение: </strong>cкидка 10% на все роллы и суши во время обеда.</li>
        <li>
          <strong>Описание: </strong>насладитесь вкусным обедом с нашей акцией! Закажите свои
          любимые роллы и суши с 11:00 до 13:00 и получите скидку 10% на ваш заказ. Это отличная
          возможность насладиться японской кухней по выгодной цене!
        </li>
      </ul>
    </div>
    <div id="new-client">
      <h3 class="promotions-header">Специальное предложение для новых клиентов</h3>
      <ul class="promotions-list">
        <li><strong>Предложение: </strong>cкидка 15% на первый заказ для новых клиентов.</li>
        <li>
          <strong>Описание: </strong>регистрируйтесь на нашем сайте и получите скидку на первый
          заказ! Попробуйте лучшие роллы и суши по привлекательной цене.
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/mixin.scss';

#promotions {
  @include flexColumn();
}
.promotions-header {
  @include header(18px);
}
.promotions-list {
  @include ulChanged();
}
</style>
