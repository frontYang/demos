var events = require('events')
var eventEmitter = new events.EventEmitter()

// 创建事件处理程序
var connectHandler = () => {
  console.log('连接成功')

  // 触发data_received事件
  eventEmitter.emit('data_received')
}

// 绑定connection事件
eventEmitter.on('connection', connectHandler)

// 绑定data_received事件
eventEmitter.on('data_received', () => {
  console.log('数据接收成功。');
})

// 触发 connection 事件 
// eventEmitter.emit('connection');



eventEmitter.on('someEvent', (arg1, arg2) => {
  console.log('listener2', arg1, arg2)
})

eventEmitter.on('someEvent', (arg1, arg2) => {
  console.log('listener1', arg1, arg2)
})

eventEmitter.emit('someEvent', 1, 2)

var count = eventEmitter.listenerCount('someEvent')

console.log("程序执行完毕。", count);
