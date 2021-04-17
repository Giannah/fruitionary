import { mutations } from '@/store/index.js'

describe('mutations', () => {
  const state = {
    fruits: [],
    fruit: [],
  }
  it('SET_FRUITS', () => {
    const fruits = [
      {
        isFruit: true,
        name: 'banana',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/banana.jpg',
        price: '493.00',
        color: '#305a59',
        description:
          'A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa.',
        taste: 'Small',
        expires: '2022-03-03T22:52:07.858Z',
        id: 3,
      },
      {
        isFruit: true,
        name: 'tomato',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/tomato.jpg',
        price: '148.00',
        color: '#2f4756',
        description:
          'The tomato is the edible, often red, berry of the plant Solanum lycopersicum, commonly known as a tomato plant. The species originated in western South America and Central America.',
        taste: 'Licensed',
        expires: '2021-09-28T02:11:36.874Z',
        id: 4,
      },
    ]

    mutations.SET_FRUITS(state, fruits)

    expect(state.fruits).toHaveLength(2)
  })

  it('SET_FRUIT', () => {
    const fruit = {
      isFruit: true,
      name: 'banana',
      image:
        'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/banana.jpg',
      price: '493.00',
      color: '#305a59',
      description:
        'A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa.',
      taste: 'Small',
      expires: '2022-03-03T22:52:07.858Z',
      id: 3,
    }

    mutations.SET_FRUIT(state, fruit)

    expect(state.fruit).toMatchObject(fruit)
  })

  it('ADD_FRUIT', () => {
    const fruit = {
      isFruit: true,
      name: 'banana',
      image:
        'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/banana.jpg',
      price: '493.00',
      color: '#305a59',
      description:
        'A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa.',
      taste: 'Small',
      expires: '2022-03-03T22:52:07.858Z',
      id: 6,
    }

    const fruit2 = {
      isFruit: true,
      name: 'tomato',
      image:
        'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/tomato.jpg',
      price: '148.00',
      color: '#2f4756',
      description:
        'The tomato is the edible, often red, berry of the plant Solanum lycopersicum, commonly known as a tomato plant. The species originated in western South America and Central America.',
      taste: 'Licensed',
      expires: '2021-09-28T02:11:36.874Z',
      id: 7,
    }

    mutations.ADD_FRUIT(state, fruit)
    mutations.ADD_FRUIT(state, fruit2)

    expect(state.fruits).toHaveLength(4)
  })

  it('REMOVE_FRUIT', () => {
    const fruit = {
      isFruit: true,
      name: 'banana',
      image:
        'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/banana.jpg',
      price: '493.00',
      color: '#305a59',
      description:
        'A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa.',
      taste: 'Small',
      expires: '2022-03-03T22:52:07.858Z',
      id: 3,
    }

    mutations.REMOVE_FRUIT(state, fruit.id)

    expect(state.fruits).toHaveLength(3)
  })
})
