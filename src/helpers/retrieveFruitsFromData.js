let fruits = []
export default function retrieveFruitsFromData(data) {
  for (let d in data) {
    if (typeof data[d] === 'object') {
      retrieveFruitsFromData(data[d])
      if (
        Object.keys(data[d]).includes('isFruit') &&
        Object.keys(data[d].includes('name'))
      ) {
        fruits = [...fruits, data[d]]
        console.log(fruits)
      } else {
        return
      }
    }
  }
  return fruits
}
