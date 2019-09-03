
const filterValue = (arr) => {
  let values = []
  for (let i = 0; i < arr.length; i++) {
    values.push(arr[i].value)
  }
  return values
}


export default {
  filterValue
}
