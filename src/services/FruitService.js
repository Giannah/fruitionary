import jsonPath from 'jsonpath'

export default function retrieveFruitsService(apiClient) {
  const fruitService = {
    async getFruits() {
      const fruits = await apiClient.get('/fruit')
      return jsonPath.query(fruits, '$..[?(@.isFruit && @.name)]')
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
