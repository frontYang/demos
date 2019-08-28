var fs = require('fs')

fs.readFile('README.md', (err, data)  => {
  if (err){
    console.log(err.stack)
    return
  }

  console.log(data.toString())
})

console.log('finished')

