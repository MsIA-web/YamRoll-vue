<script setup>
import { ref, inject, onMounted } from 'vue'
import axios from 'axios'

const sendOrder = inject('createOrder')
const updateInform = async () => {
  formData.phone = decodeURIComponent(
    encodeURIComponent(document.getElementById('phone-input').value)
  )
  formData.address = document.querySelector('#suggest').value
  formData.intercom = document.querySelector('#apartment').value
  formData.apartment = document.querySelector('#intercom').value
}

const formData = {
  id: '',
  phone: '',
  address: '',
  apartment: '',
  intercom: ''
}

const numberInputValid = ref(true)

const phoneInputValid = (input) => {
  const regEx = /^((\+7|7|8)[0-9]{10})$/

  return regEx.test(input)
}
const submitForm = async (event) => {
  event.preventDefault()
  try {
    await updateInform()
    const form = document.getElementById('form-post')
    console.log(formData.phone)
    if (form.checkValidity() && phoneInputValid(formData.phone)) {
      await sendOrder()
      axios.post('https://5b098b465695e1a4.mokky.dev/address', formData).then(() => {
        window.location.href = '/'
      })
    } else {
      console.log('Форма не валидна')
      numberInputValid.value = false
      form.addEventListener('input', function () {
        updateInform()
        if (phoneInputValid(formData.phone)) {
          numberInputValid.value = true
          form.removeEventListener('input', phoneInputValid)
        }
      })
    }
  } catch {
    ;(error) => {
      console.error('Ошибка при отправке:', error)
    }
  }
}

const suggestRef = ref(null)
const address = ref('')
const coordinates = ref(null)
let placeMark = null
let myMap

const updateSuggestRef = () => {
  suggestRef.value = document.getElementById('suggest').value
}

const getAddress = async (coordinates) => {
  try {
    // eslint-disable-next-line no-undef
    const response = await ymaps.geocode(coordinates.value)
    const firstGeoObject = response.geoObjects.get(0)
    if (firstGeoObject) {
      address.value = firstGeoObject.getAddressLine()
    } else {
      address.value = 'Адрес не найден'
    }
  } catch (err) {
    console.log(err)
  }
}

const addMark = () => {
  if (!placeMark) {
    // eslint-disable-next-line no-undef
    placeMark = new ymaps.Placemark(
      coordinates.value,
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: '/mark-location.svg',
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -25],
        draggable: true
      }
    )
    myMap.geoObjects.add(placeMark)
  } else {
    placeMark.geometry.setCoordinates(coordinates.value)
  }
  myMap.setCenter(coordinates.value, 16)
}

const reverseGeocode = async (coords) => {
  // eslint-disable-next-line no-undef
  const response = await ymaps.geocode(coords)
  const firstGeoObject = response.geoObjects.get(0)
  const data = firstGeoObject.getAddressLine()
  return data
}

const manualDraggMarker = () => {
  placeMark.events.add('dragend', async () => {
    const response = await placeMark.geometry.getCoordinates()
    const changeCoord = response.map((response) => parseFloat(response.toFixed(6)))
    const data = await reverseGeocode(changeCoord)
    suggestRef.value = data
  })
}

const search = async () => {
  updateSuggestRef()
  const request = suggestRef.value
  // eslint-disable-next-line no-undef
  const response = await ymaps.geocode(request)
  coordinates.value = response.geoObjects.get(0).geometry.getCoordinates()
  getAddress(coordinates)
  addMark()
  manualDraggMarker()
}

function init() {
  // eslint-disable-next-line no-undef
  myMap = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 9
  })
  myMap.controls.remove('geolocationControl')
  myMap.controls.remove('searchControl')
  myMap.controls.remove('trafficControl')
  myMap.controls.remove('typeSelector')
  myMap.controls.remove('fullscreenControl')
  myMap.controls.remove('rulerControl')
  myMap.controls.remove('zoomControl')

  // eslint-disable-next-line no-undef
  let suggestView1 = new ymaps.SuggestView('suggest')
  suggestView1.events.add('select', search)
  myMap.container.fitToViewport()
}

// eslint-disable-next-line no-undef
ymaps.ready(init)

const form = ref(null)
const submitButton = ref(null)

const enableSubmitButtonValidForm = () => {
  console.log('start')
  form.value.addEventListener('input', function () {
    if (this.checkValidity()) {
      submitButton.value.removeAttribute('disabled')
    } else {
      submitButton.value.setAttribute('disabled', 'disabled')
    }
  })
}

onMounted(() => {
  form.value = document.getElementById('form-post')
  submitButton.value = document.getElementById('buy')
  enableSubmitButtonValidForm()
})
</script>

<template>
  <div id="confirm-order">
    <div id="input-map">
      <form id="form-post" method="POST">
        <div class="form-field" id="input-height">
          <input
            type="number"
            required
            name="phone"
            placeholder="Введите номер телефона"
            class="phone disabled-scroll"
            id="phone-input"
          />
          <div v-if="!numberInputValid" id="number-input-valid" class="size-14">
            Номер телефона введён некорректно
          </div>
          <input
            v-model="suggestRef"
            type="text"
            id="suggest"
            @keyup.enter="search"
            name="address"
            placeholder="Введите адрес доставки"
            required
          />
          <input
            required
            type="number"
            inputmode="numeric"
            name="apartment"
            placeholder="Номер квартиры"
            class="apartment disabled-scroll"
            id="apartment"
          />
          <input
            type="number"
            inputmode="numeric"
            name="intercom"
            placeholder="Домофон"
            class="intercom disabled-scroll"
            id="intercom"
          />
        </div>
      </form>
      <div id="map"></div>
    </div>
    <button type="submit" disabled @click="submitForm" id="buy">ОФОРМИТЬ ЗАКАЗ</button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/mixin.scss';

#confirm-order {
  @include flexColumn();
}
#input-map {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 30px;
}
#form-post {
  flex-grow: 1;
  max-width: 600px;
  width: 100%;
}
.form-field {
  @include flexColumn();
}

input {
  max-width: 600px;
  width: 100%;
}
#number-input-valid {
  color: red;
}
#map {
  margin: auto;
  flex-grow: 1;
  min-width: 250px;
  height: 240px;
  width: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
}

#buy {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding: 5px 10px;
  background-color: #ee575e;
  margin: auto;
  border-radius: 0.75rem;
  color: white;
  transition: filter 0.3s ease;
  &:hover {
    filter: brightness(120%);
    cursor: pointer;
  }
  &:disabled {
    opacity: 40%;
    cursor: not-allowed;
  }
}

.disabled-scroll {
  -moz-appearance: textfield;
}
.disabled-scroll::-webkit-inner-spin-button {
  display: none;
}
</style>
