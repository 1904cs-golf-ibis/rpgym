const moveSets = require('../../client/data/moveSets')

/*
 Player Object that holds the socketId, damage for the move they selected
 and energy cost for the move they selected
*/
const playersObj = {
  playerOne: {
    socketId: '',
    damage: 0,
    energy: 0
  },
  playerTwo: {
    socketId: '',
    damage: 0,
    energy: 0
  }
}

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    /*
    This simulates joining a lobby. If a player 1 or player 2 haven't joined, add them to the playerObj.
    If other players join, we're just console logging on our side that the player is a spectator.
     ****As of right now, logic for spectators hasn't been implemented*****
    */
    if (!playersObj.playerOne.socketId) {
      playersObj.playerOne.socketId = socket.id
    } else if (!playersObj.playerTwo.socketId) {
      playersObj.playerTwo.socketId = socket.id
    } else {
      console.log('You are a spectator!')
    }
    console.log('connecting player ====>', playersObj)

    //Socket is receiving a new battle message
    socket.on('new-message', message => {
      // console.log('IM SENDING THE MESSAGE!!!!!', socket.id)
      // console.log('IM THE MESSAGE!!!!!', message)

      if (playersObj.playerOne.socketId === socket.id) {
        if (!playersObj.playerOne.energy) {
          playersObj.playerOne.damage = moveSets[message].damage
          playersObj.playerOne.energy = moveSets[message].energy
        }
      } else if (playersObj.playerTwo.socketId === socket.id) {
        if (!playersObj.playerTwo.energy) {
          playersObj.playerTwo.damage = moveSets[message].damage
          playersObj.playerTwo.energy = moveSets[message].energy
        }
      }

      if (playersObj.playerOne.energy && playersObj.playerTwo.energy) {
        // socket.broadcast.emit('broadcast', playersObj)
        // socket.emit('new-round', playersObj)
        io.to(playersObj.playerOne.socketId).emit('new-round', playersObj)
        io.to(playersObj.playerTwo.socketId).emit('new-round', playersObj)
        playersObj.playerOne.damage = 0
        playersObj.playerOne.energy = 0
        playersObj.playerTwo.damage = 0
        playersObj.playerTwo.energy = 0
      }
      console.log('PLAYERS OBJ ====>', playersObj)

      // socket.broadcast.emit('new-message', message)
      // console.log('socket.broadcast: >>>>>>>>>>>>>>>>>>>>', socket.broadcast)
      // console.log('MOVE SETS', moveSets)
      // socket.broadcast.emit('broadcast', message)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      if (socket.id === playersObj.playerOne.socketId) {
        playersObj.playerOne.socketId = ''
        console.log('PLAYER ONE DISC SOCKET ID SHOULD BE EMPTY')
      } else if (socket.id === playersObj.playerTwo.socketId) {
        playersObj.playerTwo.socketId = ''
        console.log('PLAYER TWO DISC SOCKET ID SHOULD BE EMPTY')
      }

      console.log('disconnecting player', playersObj)
    })
  })
}
