export default function retrieveFruitsFromData(data, fruits) {
  if (typeof data !== 'object') {
    return
  }
  if (
    Object.keys(data).includes('isFruit') &&
    Object.keys(data).includes('name') &&
    data.isFruit === true
  ) {
    fruits.push(data)
  }
  Object.keys(data).forEach((p) => retrieveFruitsFromData(data[p], fruits))
}
