
const filterValue = (arr, value) => {
  const values = []
  for (let i = 0; i < arr.length; i++) {
    values.push(arr[i][value])
  }
  return values
}

const removeByVal = (arr, name, val) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][name] === val) {
      arr.splice(i, 1)
      break
    }
  }
  return arr
}

export default {
  filterValue,
  removeByVal
}
