export default function retrieveFruitsFromData(data) {
  if (typeof data !== 'object') {
    return []
  }
  let fruits = Object.keys(data).flatMap((p) => retrieveFruitsFromData(data[p]))
  if (
    Object.keys(data).includes('isFruit') &&
    Object.keys(data).includes('name') &&
    data.isFruit === true
  ) {
    fruits.push(data)
  }
  return fruits
}
