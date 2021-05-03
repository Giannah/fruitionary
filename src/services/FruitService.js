// import jsonPath from 'jsonpath'
import retrieveFruitsFromData from '@/helpers/retrieveFruitsFromData.js'

export default function retrieveFruitsService(apiClient) {
  const fruitService = {
    async getFruits() {
      let data = []
      const fruits = await apiClient.get('/fruit')
      console.log('hi there', fruits)
      retrieveFruitsFromData(fruits, data)
      return data
      // return jsonPath.query(fruits, '$..[?(@.isFruit && @.name)]')
    },
    async getFruitById(id) {
      const response = await apiClient.get(`/fruit/${id}`)
      return response.data
    },
    async addFruit(payload) {
      await apiClient.post('/fruit', payload)
    },
    async deleteFruit(id) {
      await apiClient.delete(`/fruit/${id}`)
    },
  }
  return fruitService
}
