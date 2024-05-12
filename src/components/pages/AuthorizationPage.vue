<script setup>
import { ref } from 'vue'
const userStatus = ref(true)

const changeUserStatus = () => {
  if (userStatus.value === true) {
    userStatus.value = false
  } else {
    userStatus.value = true
  }
}
</script>

<template>
  <div class="authorization">
    <div class="sign-in" v-if="userStatus">
      <form method="POST">
        <div class="form-field">
          <input
            type="number"
            name="phone"
            placeholder="Введите номер телефона"
            class="phone size-14"
          />
          <button type="submit" class="submit-button size-16">Вход</button>
        </div>
      </form>
      <p id="to-registration" class="half-button size-16" @click="changeUserStatus">
        Вы ещё не зарегистрированы ?
      </p>
    </div>
    <div class="registration" v-if="!userStatus">
      <form method="POST">
        <div class="form-field">
          <input type="number" name="phone" placeholder="Введите номер телефона" class="phone" />
          <button type="submit" class="submit-button">Зарегистрироваться</button>
        </div>
      </form>
      <p id="to-login" class="half-button" @click="changeUserStatus">Вы уже зарегистрированы ?</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/mixin.scss';

.authorization {
  width: 30%;
  height: 400px;
  margin: auto;
  background-color: #eeeff0;
  border-radius: 0.75rem;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
.sign-in,
.registration {
  height: 380px;
  @include flexColumn();
  justify-content: center;
}
.form-field {
  @include flexColumn();
}
.phone:focus {
  border: solid 2px rgb(0, 0, 0);
  outline: solid 1px rgb(65, 64, 64);
}
.submit-button {
  cursor: pointer;
  padding: 0.5rem;
  background-color: rgb(255, 255, 255);
  border-radius: 0.75rem;
  border: solid 2px #ccc;
  font-size: 16px;
  width: 60%;
  margin: auto;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  &:hover {
    background-color: #ee575e;
    border-color: #ee575e;
    color: white;
  }
}
.half-button {
  margin-top: 20px;
  padding: 10px 0px;
  text-align: center;
  cursor: pointer;
  border-radius: 0.75rem;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  &:hover {
    background-color: #ee575e;
    border-color: #ee575e;
    color: white;
  }
}
</style>
