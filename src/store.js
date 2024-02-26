import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    cart: [],
    items: {
      sets: []
    }
  },
  mutations: {
    addToCart(state, { category, item }) {
      console.log('start add', state.items[category])
      const index = state.cart.findIndex((cartItem) => cartItem.id === item.id)
      const itemIndex = state.items[category].findIndex((i) => i.id === item.id)
      if (index !== -1 && itemIndex !== -1) {
        state.cart[index].orderQuantity++
        state.items[category][itemIndex].orderQuantity++
      } else {
        state.cart.push({
          ...item,
          orderQuantity: 1,
          isAdded: true
        })
        state.items[category][itemIndex] = {
          ...item,
          orderQuantity: 1,
          isAdded: true
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
      localStorage.setItem(category, JSON.stringify(state.items[category]))
    },
    removeFromCart(state, { category, item }) {
      const index = state.cart.findIndex((cartItem) => cartItem.id === item.id)
      const itemIndex = state.items[category].findIndex((i) => i.id === item.id)

      if (index !== -1) {
        const updateItem = { ...state.cart[index] }
        console.log('reduce cart start')

        if (updateItem.orderQuantity > 1) {
          updateItem.orderQuantity--
          state.items[category][itemIndex].orderQuantity--
          state.cart.splice(index, 1, updateItem)
          console.log('reduce cart item')
        } else {
          state.cart.splice(index, 1)
          updateItem.isAdded = false
          state.items[category][itemIndex].isAdded = false
          console.log('remove cart')
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateItemList(state, { data, category }) {
      state.items[category] = data
      localStorage.setItem(category, JSON.stringify(data))
    },
    updateCart(state, localCart) {
      state.cart = localCart
      localStorage.setItem('cart', JSON.stringify(localCart))
    }
  },
  actions: {
    async fetchSets({ commit }, category) {
      try {
        const localSets = localStorage.getItem(category)
        console.log('start fetch', JSON.parse(localSets))
        if (localSets) {
          const data = JSON.parse(localSets)
          commit('updateItemList', { data, category: 'sets' })
          console.log(store.state.items.sets)
        } else {
          console.log('else start')

          const response = await axios.get(`https://5b098b465695e1a4.mokky.dev/sets`)
          const data = response.data
          commit('updateItemList', { data, category: 'sets' })
        }
      } catch (err) {
        console.log('fetchSets action failed:', err)
      }
    },
    async fetchCart({ commit }) {
      try {
        const localCart = JSON.parse(localStorage.getItem('cart')) || []
        commit('updateCart', localCart)
        return localCart
      } catch (err) {
        console.log(err)
      }
    }
  }
})

export default store
