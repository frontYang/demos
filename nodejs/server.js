var http = require('http')


http.createServer((req, res) => {
  // 发送http头, 状态值，内容
  res.writeHead(200, { 'Content-Type': 'text/plain' })

  // 发送响应数据
  res.end('Hello')
}).listen(8888)


console.log('Serve running at http://127.0.0.1:8888/')

