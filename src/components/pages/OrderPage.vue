<script setup>
import { ref, inject } from 'vue'
import axios from 'axios'

const sendOrder = inject('createOrder')

const updateInform = async () => {
  formData.phone = document.querySelector('#phone').value
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

const submitForm = async () => {
  try {
    await sendOrder()
    await updateInform()
    axios.post('https://5b098b465695e1a4.mokky.dev/address', formData).then(() => {
      window.location.href = '/'
      console.log('Данные успешно отправлены')
    })
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
      console.log('address', address.value)
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
        iconImageHref: '/public/mark-location.svg',
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
    console.log('suggest', suggestRef.value)
  })
}

const search = async () => {
  updateSuggestRef()
  const request = suggestRef.value
  // eslint-disable-next-line no-undef
  const response = await ymaps.geocode(request)
  console.log('search geocode', response)
  coordinates.value = response.geoObjects.get(0).geometry.getCoordinates()
  console.log('first coords', coordinates.value, typeof coordinates.value)
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
  myMap.controls.remove('geolocationControl') // удаляем геолокацию
  myMap.controls.remove('searchControl')
  myMap.controls.remove('trafficControl') // удаляем контроль трафика
  myMap.controls.remove('typeSelector') // удаляем тип
  myMap.controls.remove('fullscreenControl') // удаляем кнопку перехода в полноэкранный режим
  myMap.controls.remove('rulerControl') // удаляем контрол правил
  myMap.controls.remove('zoomControl') // удаляем контрол зуммирования

  // eslint-disable-next-line no-undef
  let suggestView1 = new ymaps.SuggestView('suggest')
  suggestView1.events.add('select', search)
}

// eslint-disable-next-line no-undef
ymaps.ready(init)

document.addEventListener('DOMContentLoaded', function () {
  const sourceElement = document.getElementById('input-height')
  const targetElement = document.getElementById('map')

  if (sourceElement && targetElement) {
    const height = sourceElement.clientHeight
    targetElement.style.height = height + 'px'
  }
})
</script>

<template>
  <div id="confirm-order">
    <div id="input-map">
      <form method="POST">
        <div class="form-field" id="input-height">
          <input
            type="number"
            name="phone"
            placeholder="Введите номер телефона"
            class="phone disabled-scroll"
            id="phone"
            required
          />
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
    <button type="submit" @click="submitForm" id="buy">ОФОРМИТЬ ЗАКАЗ</button>
  </div>
</template>

<style lang="scss" scoped>
#confirm-order {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
#input-map {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.form-field {
  display: flex;
  flex-direction: column;
}

input {
  min-width: 600px;
}
#map {
  width: 400px;
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
}
#buy:hover {
  filter: brightness(120%);
}
.disabled-scroll {
  -moz-appearance: textfield;
}
.disabled-scroll::-webkit-inner-spin-button {
  display: none;
}
</style>
