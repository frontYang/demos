const bcrypt = require('bcryptjs')

const tools = {
  enbcrypt(val){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(val, salt)

    return hash
  }
}

module.exports = tools