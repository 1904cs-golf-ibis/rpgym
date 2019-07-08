const moveSets = require('../../client/data/moveSets')
const {
  updateMyStatsThunkCreator,
  updateOpponentStatsThunkCreator,
  getMyStatsThunkCreator,
  getOpponentStatsThunkCreator
} = require('../../client/store/battle')

/*
 Player Object that holds the socketId, damage for the move they selected
 and energy cost for the move they selected
*/
class Battle {
  constructor() {
    this.playerOne = {
      socketId: '',
      damage: 0,
      energy: 0
    }
    this.playerTwo = {
      socketId: '',
      damage: 0,
      energy: 0
    }
  }
}

const playersObj = new Battle()

module.exports = io => {
  io.on('connection', socket => {
    // io.of('/battle').on('connection', socket => {
    //   socket.emit('Welcome', 'This is the Battle Room!')

    console.log(`A socket connection to the server has been made: ${socket.id}`)

    /*
    This simulates joining a lobby. If a player 1 or player 2 haven't joined, add them to the playerObj.
    If other players join, we're just console logging on our side that the player is a spectator.
     ****As of right now, logic for spectators hasn't been implemented*****
    */
    if (!playersObj.playerOne.socketId) {
      playersObj.playerOne.socketId = socket.id
      // joining player one's default room
      socket.join(playersObj.playerOne.socketId)
      //
    } else if (!playersObj.playerTwo.socketId) {
      playersObj.playerTwo.socketId = socket.id
      // joining player one's default room
      socket.join(playersObj.playerOne.socketId)
      //
    }
    // else {
    //   // joining player one's default room
    //   socket.join(playersObj.playerOne.socketId)
    //   //
    //   console.log('You are a spectator!')
    // }

    // players check
    const playersCheck =
      io.sockets.adapter.rooms[playersObj.playerOne.socketId].sockets
    console.log('playersCheck: ', playersCheck)

    console.log('connecting player ====>', playersObj)

    // Socket is receiving a new battle message
    socket.on('new-message', message => {
      // console.log('IM SENDING THE MESSAGE!!!!!', socket.id)
      // console.log('IM THE MESSAGE!!!!!', message)

      // destructure contents of message
      // const {
      //   curAttack,
      //   mySpeed,
      //   myIsDefeated,
      //   opponentSpeed,
      //   opponentIsDefeated
      // } = message

      const {curAttack, myStats, opponentStats} = message

      if (playersObj.playerOne.socketId === socket.id) {
        if (!playersObj.playerOne.energy) {
          playersObj.playerOne.damage = moveSets[curAttack].damage
          playersObj.playerOne.energy = moveSets[curAttack].energy
        }
      } else if (playersObj.playerTwo.socketId === socket.id) {
        if (!playersObj.playerTwo.energy) {
          playersObj.playerTwo.damage = moveSets[curAttack].damage
          playersObj.playerTwo.energy = moveSets[curAttack].energy
        }
      }

      playersObj.data = message

      if (playersObj.playerOne.energy && playersObj.playerTwo.energy) {
        // create updated stats object for user
        const myUpdatedHpCurrent =
          myStats.hpCurrent - playersObj.playerTwo.damage
        const myUpdatedEnergyCurrent =
          myStats.energyCurrent - playersObj.playerOne.energy
        const myUpdatedStats = {
          hpCurrent: myUpdatedHpCurrent > 0 ? myUpdatedHpCurrent : 0,
          energyCurrent: myUpdatedEnergyCurrent,
          isDefeated: !myUpdatedHpCurrent
        }

        // create updated stats object for opponent
        const opponentUpdatedHpCurrent =
          myStats.hpCurrent - playersObj.playerTwo.damage
        const opponentUpdatedEnergyCurrent =
          myStats.energyCurrent - playersObj.playerOne.energy
        const opponentUpdatedStats = {
          hpCurrent:
            opponentUpdatedHpCurrent > 0 ? opponentUpdatedHpCurrent : 0,
          energyCurrent: opponentUpdatedEnergyCurrent,
          isDefeated: !(opponentUpdatedHpCurrent > 0)
        }

        if (myStats.speed > opponentStats.speed) {
          console.log('I AM ATTACKING FIRST')
          store.dispatch(updateOpponentStatsThunkCreator(opponentUpdatedStats))
          // implement some method of retrieving updated isDefeated status

          if (opponentIsDefeated) {
            // end battle with a win
            console.log('YOU WIN!')
          } else {
            store.dispatch(updatedMyStatsActionCreator(roundMe))
            if (myIsDefeated) {
              // end battle with a loss
              console.log('you lose...')
            }
          }
        } else if (myStats.speed < opponentStats.speed) {
          console.log('OPPONENT IS ATTACKING FIRST')
          store.dispatch(updatedMyStatsActionCreator(roundMe))
          // implement some method of retrieving updated isDefeated status
          if (myIsDefeated) {
            // end battle with a loss
            console.log('you lose...')
          } else {
            store.dispatch(updatedOpponentStatsActionCreator(roundOpponent))
            if (opponentIsDefeated) {
              // end battle with a win
              console.log('YOU WIN!')
            }
          }
        } else {
          const coinToss = Math.random() * 100
          if (coinToss >= 50) {
            console.log('I AM ATTACKING FIRST BY COIN FLIP')
            store.dispatch(updateOpponentStatsActionCreator(roundOpponent))
            // implement some method of retrieving updated isDefeated status
            if (opponentIsDefeated) {
              // end battle with a win
              console.log('YOU WIN!')
            } else {
              store.dispatch(updateMyStatsActionCreator(roundMe))
              if (myIsDefeated) {
                // end battle with a loss
                console.log('you lose...')
              }
            }
          } else {
            console.log('OPPONENT IS ATTACKING FIRST BY COIN FLIP')
            store.dispatch(updateMyStatsActionCreator(roundMe))
            // implement some method of retrieving updated isDefeated status
            if (myIsDefeated) {
              // end battle with a loss
              console.log('you lose...')
            } else {
              store.dispatch(updateOpponentStatsActionCreator(roundOpponent))
              if (opponentIsDefeated) {
                // end battle with a win
                console.log('YOU WIN!')
              }
            }
          }
        }

        io.to(playersObj.playerOne.socketId).emit('new-round', playersObj)

        playersObj.playerOne.damage = 0
        playersObj.playerOne.energy = 0
        playersObj.playerTwo.damage = 0
        playersObj.playerTwo.energy = 0
      }
      console.log('PLAYERS OBJ ====>', playersObj)
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
      playersObj.data = {}
      console.log('disconnecting player', playersObj)
    })
  })
}
