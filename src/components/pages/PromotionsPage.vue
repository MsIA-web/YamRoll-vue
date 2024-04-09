<script setup></script>
<template>
  <div id="promotions">
    <div id="delicious-lunch">
      <h3>Вкусный обед</h3>
      <ul>
        <li><span>Время акции: </span>с 11:00 до 13:00 по будням.</li>
        <li><span>Предложение: </span>cкидка 10% на все роллы и суши во время обеда.</li>
        <li>
          <span>Описание: </span>насладитесь вкусным обедом с нашей акцией! Закажите свои любимые
          роллы и суши с 11:00 до 13:00 и получите скидку 10% на ваш заказ. Это отличная возможность
          насладиться японской кухней по выгодной цене!
        </li>
      </ul>
    </div>
    <div id="new-client">
      <h3>Специальное предложение для новых клиентов</h3>
      <ul>
        <li><span>Предложение: </span>cкидка 15% на первый заказ для новых клиентов.</li>
        <li>
          <span>Описание: </span>регистрируйтесь на нашем сайте и получите скидку на первый заказ!
          Попробуйте лучшие роллы и суши по привлекательной цене.
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#promotions {
  padding: 0px 10px 0px 10px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
h3 {
  font-size: 18px;
  font-weight: 600;
}
ul {
  padding-left: 30px;
}
li {
  padding-top: 10px;
  list-style: disc;
  line-height: 1.5;
}
span {
  font-weight: 600;
}
</style>
