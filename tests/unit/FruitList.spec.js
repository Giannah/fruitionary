import { createStore } from 'vuex'
import { shallowMount } from '@vue/test-utils'
import FruitList from '@/views/FruitList.vue'
import ElementPlus from 'element-plus'

describe('FruitList', () => {
  it('calls getFruits', () => {
    const store = createStore({
      state: {},
      getters: {
        allFruits: jest.fn(),
      },
    })
    store.dispatch = jest.fn()
    shallowMount(FruitList, {
      global: {
        plugins: [store, ElementPlus],
      },
    })

    expect(store.dispatch).toHaveBeenCalled()
  })
})
