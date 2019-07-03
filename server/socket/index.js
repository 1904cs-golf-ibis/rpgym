module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('new-message', message => {
      socket.broadcast.emit('new-message', message)

      console.log('socket.broadcast: >>>>>>>>>>>>>>>>>>>>', socket.broadcast)
      socket.broadcast.emit('broadcast', message)
    })

    // socket.on('new-channel', channel => {
    //   socket.broadcast.emit('new-channel', channel)
    // })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
