import { actions } from '@/store/index.js'
import retrieveFruitsService from '@/services/FruitService'
import data from './data'

let fruitService
let apiClient

const mockGetFruits = jest.fn()
const mockGetFruitById = jest.fn()
const mockAddFruit = jest.fn()
const mockDeleteFruit = jest.fn()

apiClient = {
  get: Promise.resolve({ data }),
}

fruitService = retrieveFruitsService(apiClient)

jest.mock('@/services/FruitService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getFruits: mockGetFruits,
      getFruitById: mockGetFruitById,
      addFruit: mockAddFruit,
      deleteFruit: mockDeleteFruit,
    }
  })
})

describe('Actions', () => {
  it('getFruits', async () => {
    const commit = jest.fn()
    fruitService.getFruits.mockResolvedValue({ data })

    await actions.getFruits({ commit })

    expect(commit).toHaveBeenCalledWith('SET_FRUITS', { data })
  })

  it('getFruitById', async () => {
    const fruit = {
      isFruit: true,
      name: 'apple',
      image:
        'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/apple.jpg',
      price: '15.00',
      color: '#3a6317',
      description: 'An apple is an edible fruit produced by an apple tree.',
      taste: 'Licensed',
      expires: '2021-03-12T03:10:47.170Z',
      id: 5,
    }

    const commit = jest.fn()
    fruitService.getFruitById.mockResolvedValue(fruit.id)

    await actions.getFruitById({ commit }, fruit.id)

    expect(commit).toHaveBeenCalledWith('SET_FRUIT', 5)
  })

  it('addFruit', async () => {
    const fruit = {
      isFruit: true,
      name: 'apple',
      image:
        'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/apple.jpg',
      price: '15.00',
      color: '#3a6317',
      description: 'An apple is an edible fruit produced by an apple tree.',
      taste: 'Licensed',
      expires: '2021-03-12T03:10:47.170Z',
      id: 5,
    }

    const commit = jest.fn()
    fruitService.addFruit.mockResolvedValue({ fruit })

    await actions.addFruit({ commit }, { fruit })

    expect(commit).toHaveBeenCalledWith('ADD_FRUIT', { fruit })
  })

  it('deleteFruit', async () => {
    const fruit = {
      isFruit: true,
      name: 'apple',
      image:
        'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/apple.jpg',
      price: '15.00',
      color: '#3a6317',
      description: 'An apple is an edible fruit produced by an apple tree.',
      taste: 'Licensed',
      expires: '2021-03-12T03:10:47.170Z',
      id: 5,
    }

    const commit = jest.fn()
    fruitService.deleteFruit.mockResolvedValue(fruit.id)

    await actions.deleteFruit({ commit }, fruit.id)

    expect(commit).toHaveBeenCalledWith('REMOVE_FRUIT', 5)
  })
})
