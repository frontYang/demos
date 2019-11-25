
const trim = (str) => {
  return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
}

const isEmpty = (val) => {
  return trim(val).length === 0
}

const validateEmpty = (rule, value, callback) => {
  if (isEmpty(value)) {
    callback(new Error('不能为空！'))
  } else {
    callback()
  }
}

export default {
  validateEmpty
}

