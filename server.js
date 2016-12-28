var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

io.on('connection', function (socket) {
  socket.broadcast.emit('notifications', 'A user connected!')
  socket.on('disconnect', function () {
    socket.broadcast.emit('notifications', 'A user disconnected...')
  })
  socket.on('message to server', function (msg) {
    io.emit('message to client', msg)
  })
  socket.on('typing status to server', function (bool) {
    console.log(bool)
    socket.broadcast.emit('typing status to client', bool)
  })
})

http.listen(3001, function(){
  console.log('listening on *:3001')
})
