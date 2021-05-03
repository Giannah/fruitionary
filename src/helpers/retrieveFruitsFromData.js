let fruits = []
export default function retrieveFruitsFromData(data) {
  for (let d in data) {
    if (typeof data[d] === 'object') {
      retrieveFruitsFromData(data[d])
      if (
        Object.keys(data[d]).includes('isFruit') &&
        Object.keys(data[d]).includes('name') &&
        data[d].isFruit === true
      ) {
        fruits = [...fruits, data[d]]
        console.log('fruits', fruits)
      }
    } else {
      return fruits
    }
  }
}
