import { createStore } from 'vuex'
import axios from 'axios'
import retrieveFruitsService from '@/services/FruitService.js'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const state = {
  fruits: [],
  fruit: null,
}

export const getters = {
  allFruits: (state) => {
    return state.fruits
  },
  fruit: (state) => {
    return state.fruit
  },
}

export const mutations = {
  SET_FRUITS(state, fruits) {
    state.fruits = fruits
  },
  SET_FRUIT(state, fruit) {
    state.fruit = fruit
  },
  ADD_FRUIT(state, newFruit) {
    state.fruits = [...state.fruits, newFruit]
  },
  REMOVE_FRUIT(state, id) {
    state.fruits = [...state.fruits].filter((fruit) => fruit.id !== id)
  },
}

export const actions = {
  getFruits({ commit }) {
    const FruitService = retrieveFruitsService(apiClient)
    FruitService.getFruits()
      .then((response) => {
        commit('SET_FRUITS', response)
      })
      .catch((error) => {
        throw new Error(`Something went wrong: ${error}`)
      })
  },
  getFruitById({ commit }, id) {
    const FruitService = retrieveFruitsService(apiClient)
    FruitService.getFruitById(id)
      .then((response) => {
        commit('SET_FRUIT', response)
      })
      .catch((error) => {
        throw new Error(`Something went wrong: ${error}`)
      })
  },
  addFruit({ commit }, fruit) {
    const FruitService = retrieveFruitsService(apiClient)
    FruitService.addFruit(fruit)
      .then(() => {
        commit('ADD_FRUIT', fruit)
      })
      .catch((error) => {
        throw new Error(`Something went wrong: ${error}`)
      })
  },
  deleteFruit({ commit }, id) {
    const FruitService = retrieveFruitsService(apiClient)
    FruitService.deleteFruit(id)
      .then(() => {
        commit('REMOVE_FRUIT', id)
      })
      .catch((error) => {
        throw new Error(`Something went wrong: ${error}`)
      })
  },
}

export default createStore({
  state,
  mutations,
  actions,
  getters,
})
