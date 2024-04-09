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
          <input type="number" name="phone" placeholder="Введите номер телефона" class="phone" />
          <button type="submit" class="submit-button">Вход</button>
        </div>
      </form>
      <p id="to-registration" class="half-button" @click="changeUserStatus">
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

<style lang="scss">
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
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 40px;
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
}
.half-button {
  margin-top: 20px;
  padding: 10px 0px;
  text-align: center;
  cursor: pointer;
  transition: filter 0.3s ease;
  border-radius: 0.75rem;
}
.half-button:hover {
  background-color: #d5d3d3;
}
</style>
