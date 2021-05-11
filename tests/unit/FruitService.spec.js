import data from './data'
import retrieveFruitsService from '@/services/FruitService'

let fruitService
let apiClient

beforeEach(() => {
  apiClient = {
    get: jest.fn(),
    delete: jest.fn(),
    post: jest.fn(),
  }
  fruitService = retrieveFruitsService(apiClient)
})

describe('FruitService', () => {
  describe('getFruits', () => {
    beforeEach(() => {
      apiClient.get.mockResolvedValue({ data })
    })
    it('should retrieve a list', async () => {
      expect(await fruitService.getFruits()).toContainEqual({
        isFruit: true,
        name: 'kiwi',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/kiwi.jpg',
        price: '553.00',
        color: '#4e346b',
        description:
          'Kiwifruit (often shortened to kiwi outside Australia and New Zealand), or Chinese gooseberry, is the edible berry of several species of woody vines in the genus Actinidia.',
        taste: 'Awesome',
        expires: '2021-04-11T17:33:11.120Z',
        id: 6,
      })
    })

    it('should call the correct url', async () => {
      await fruitService.getFruits()
      expect(apiClient.get).toHaveBeenCalledWith('/fruit')
    })

    it('should retrieve deeply nested fruits', async () => {
      expect(await fruitService.getFruits()).toContainEqual({
        isFruit: true,
        name: 'pineapple',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/pineapple.jpg',
        price: '217.00',
        color: '#42072c',
        description:
          'The pineapple (Ananas comosus) is a tropical plant with an edible fruit and the most economically significant plant in the family Bromeliaceae.',
        taste: 'Fantastic',
        expires: '2021-06-16T07:50:58.104Z',
        id: 1,
      })
    })

    it("shouldn't retrieve items where isFruit equals false", async () => {
      expect(await fruitService.getFruits()).not.toContainEqual({
        isFruit: false,
        name: 'eggplant',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/eggplant.jpg',
        price: '346.00',
        color: '#2e2f4b',
        description:
          'Most commonly purple, the spongy, absorbent fruit is used in several cuisines. Typically used as a vegetable in cooking, it is a berry by botanical definition. As a member of the genus Solanum, it is related to the tomato and potato. Like the tomato, its skin and seeds can be eaten, but, like the potato, it is usually eaten cooked. Eggplant is nutritionally low in macronutrient and micronutrient content, but the capability of the fruit to absorb oils and flavors into its flesh through cooking expands its use in the culinary arts.',
        taste: 'Rustic',
        expires: '2021-04-27T19:02:38.958Z',
        id: '10c78923-d978-45c7-a999-904853c2df49',
      })
    })

    it("shouldn't retrieve misleading values ", async () => {
      expect(await fruitService.getFruits()).not.toContainEqual({
        isFruit: true,
      })
    })

    it('should retrieve added fruits', async () => {
      expect(await fruitService.getFruits()).toContainEqual({
        isFruit: true,
        name: 'pear',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/kiwi.jpg',
        price: '553.00',
        color: '#4e346b',
        description:
          'Kiwifruit (often shortened to kiwi outside Australia and New Zealand), or Chinese gooseberry, is the edible berry of several species of woody vines in the genus Actinidia.',
        taste: 'Awesome',
        expires: '2021-04-11T17:33:11.120Z',
        id: 7,
      })
    })
  })

  describe('getFruitById', () => {
    it('should call the correct url', async () => {
      const fruit = {
        isFruit: true,
        name: 'pear',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/kiwi.jpg',
        price: '553.00',
        color: '#4e346b',
        description:
          'Kiwifruit (often shortened to kiwi outside Australia and New Zealand), or Chinese gooseberry, is the edible berry of several species of woody vines in the genus Actinidia.',
        taste: 'Awesome',
        expires: '2021-04-11T17:33:11.120Z',
        id: 7,
      }
      apiClient.get.mockResolvedValueOnce({ data: fruit })
      await fruitService.getFruitById(fruit.id)
      expect(apiClient.get).toHaveBeenCalledWith(`/fruit/7`)
    })

    it('should fetch the right data', async () => {
      const fruit = {
        isFruit: true,
        name: 'pear',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/kiwi.jpg',
        price: '553.00',
        color: '#4e346b',
        description:
          'Kiwifruit (often shortened to kiwi outside Australia and New Zealand), or Chinese gooseberry, is the edible berry of several species of woody vines in the genus Actinidia.',
        taste: 'Awesome',
        expires: '2021-04-11T17:33:11.120Z',
        id: 7,
      }
      apiClient.get.mockResolvedValueOnce({ data: fruit })
      expect(await fruitService.getFruitById(fruit.id)).toStrictEqual({
        isFruit: true,
        name: 'pear',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/kiwi.jpg',
        price: '553.00',
        color: '#4e346b',
        description:
          'Kiwifruit (often shortened to kiwi outside Australia and New Zealand), or Chinese gooseberry, is the edible berry of several species of woody vines in the genus Actinidia.',
        taste: 'Awesome',
        expires: '2021-04-11T17:33:11.120Z',
        id: 7,
      })
    })
  })

  describe('deleteFruit', () => {
    it('should call the right url', async () => {
      const fruit = {
        isFruit: true,
        name: 'pear',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/kiwi.jpg',
        price: '553.00',
        color: '#4e346b',
        description:
          'Kiwifruit (often shortened to kiwi outside Australia and New Zealand), or Chinese gooseberry, is the edible berry of several species of woody vines in the genus Actinidia.',
        taste: 'Awesome',
        expires: '2021-04-11T17:33:11.120Z',
        id: 7,
      }

      apiClient.delete.mockImplementationOnce((id) => id === fruit.id)
      await fruitService.deleteFruit(fruit.id)

      expect(apiClient.delete).toHaveBeenCalledWith('/fruit/7')
    })
  })

  describe('addFruit', () => {
    it('should call the right url', async () => {
      const fruit = {
        isFruit: true,
        name: 'pear',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/kiwi.jpg',
        price: '553.00',
        color: '#4e346b',
        description:
          'Kiwifruit (often shortened to kiwi outside Australia and New Zealand), or Chinese gooseberry, is the edible berry of several species of woody vines in the genus Actinidia.',
        taste: 'Awesome',
        expires: '2021-04-11T17:33:11.120Z',
        id: 7,
      }

      apiClient.post.mockImplementationOnce((payload) => payload === fruit)
      await fruitService.addFruit(fruit)

      expect(apiClient.post).toHaveBeenCalledWith('/fruit', fruit)
    })
  })
})
