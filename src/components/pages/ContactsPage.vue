<script setup></script>

<template>
  <div id="contacts">
    <h3 class="size-18">Контакты</h3>
    <p>
      Если у вас возникли вопросы или требуется дополнительная информация, вы можете связаться с
      нами:
    </p>
    <ul>
      <li><strong>Телефон: </strong>+7 (XXX) XXX-XX-XX</li>
      <li>
        <strong>Электронная почта: </strong>
        <a href="mailto:info@deliveryrolls.ru">info@deliveryrolls.ru</a>
      </li>
    </ul>
    <p id="text-end">
      Мы всегда готовы помочь вам и ответить на все ваши вопросы. Не стесняйтесь обращаться к нам!
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/mixin.scss';

#contacts {
  @include flexColumn();
}
h3 {
  @include header(18px);
}
p {
  padding-left: 10px;
}
ul {
  @include ulChanged();
}
a {
  color: #0000ee;
}
#last-p {
  margin: auto;
}
</style>
