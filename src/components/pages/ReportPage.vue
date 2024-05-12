<script setup></script>

<template>
  <div id="report">
    <h2 class="size-20">Обратная связь по ошибкам</h2>
    <p>
      Если вы столкнулись с проблемами при использовании нашего сайта или заметили ошибки,
      пожалуйста, дайте нам знать! Мы стремимся обеспечить максимальное удобство нашим клиентам, и
      ваша обратная связь очень важна для нас. Чтобы сообщить о проблеме или ошибке, отправьте
      сообщение на следующий адрес электронной почты:
    </p>
    <strong>Электронная почта для обратной связи по ошибкам:</strong>
    <a href="mailto:info@deliveryrolls.ru">info@deliveryrolls.ru</a>
    <p>
      Мы гарантируем быстрый ответ и оперативное решение возникших проблем. Ваше мнение поможет нам
      улучшить наш сервис!
    </p>
    <div>
      <p>С уважением,</p>
      <p>Команда YamRoll</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/mixin.scss';

#report {
  @include flexColumn();
}

h2 {
  @include header(20px);
}
p {
  @include paragraph();
}
a {
  padding-left: 10px;
  color: #0000ee;
}
</style>
