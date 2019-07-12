/* eslint-disable max-statements */
/* eslint-disable complexity */
const moveSets = require('../../client/data/moveSets')
const {User} = require('../db/models/index')

/*
 Player Object that holds the socketId, damage for the move they selected
 and energy cost for the move they selected
*/
class Battle {
  constructor() {
    this.playerOne = {
      socketId: '',
      stravaId: '',
      speed: 0,
      damage: 0,
      energy: 0,
      energyCurrent: 0,
      hpCurrent: 0
    }
    this.playerTwo = {
      socketId: '',
      stravaId: '',
      speed: 0,
      damage: 0,
      energy: 0,
      energyCurrent: 0,
      hpCurrent: 0
    }
  }
}

const playersObj = new Battle()

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
      // joining player one's default room
      socket.join(playersObj.playerOne.socketId)
    } else if (!playersObj.playerTwo.socketId) {
      playersObj.playerTwo.socketId = socket.id
      // joining player one's default room
      socket.join(playersObj.playerOne.socketId)
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

    socket.on('me', async data => {
      console.log('HERE IS ME!!!', data)
      const addingUserSocketId = await User.update(
        {
          socketId: socket.id
        },
        {
          where: {
            stravaId: data
          }
        }
      )
    })

    socket.on('challenge-issued', async stravaId => {
      const myData = await User.findOne({
        where: {
          socketId: socket.id
        }
      })
      const infoP1 = myData.dataValues
      console.log('IM THE INFO IN THE SERVER!', infoP1)
      const opponent = await User.findOne({
        where: {
          stravaId: stravaId
        },
        returning: true,
        plain: true
      })
      console.log('I AM THE OPPONENT', opponent.dataValues)
      io.to(opponent.dataValues.socketId).emit('challenge-issued', infoP1)
    })

    //Socket is receiving a new battle message
    socket.on('new-message', async message => {
      console.log('MESSAGE ====>', message)
      const {curAttack, myStats, opponentStats} = message

      if (playersObj.playerOne.socketId === socket.id) {
        if (!playersObj.playerOne.energy) {
          playersObj.playerOne.stravaId = myStats.stravaId
          playersObj.playerOne.speed = myStats.speed
          playersObj.playerOne.damage = moveSets[curAttack].damage
          playersObj.playerOne.energy = moveSets[curAttack].energy
          playersObj.playerOne.energyCurrent = myStats.energyCurrent
          playersObj.playerOne.hpCurrent = myStats.hpCurrent

          playersObj.playerTwo.energyCurrent = opponentStats.energyCurrent
          playersObj.playerTwo.hpCurrent = opponentStats.hpCurrent
          playersObj.playerTwo.stravaId = opponentStats.stravaId
          playersObj.playerTwo.speed = opponentStats.speed
        }
      } else if (playersObj.playerTwo.socketId === socket.id) {
        if (!playersObj.playerTwo.energy) {
          playersObj.playerTwo.damage = moveSets[curAttack].damage
          playersObj.playerTwo.energy = moveSets[curAttack].energy
        }
      }

      playersObj.data = message
      console.log('PLAYERS OBJ ===>', playersObj)

      //checking to see if both attacks were made
      if (playersObj.playerOne.energy && playersObj.playerTwo.energy) {
        //if player 1 is faster than player 2, player 1 attacks first
        if (playersObj.playerOne.speed > playersObj.playerTwo.speed) {
          console.log('PLAYER 1 IS ATTACKING FIRST')
          //calculating player 2 hp by subtracting P2 HP current from P1 move damage
          const playerTwoUpdatedHp =
            playersObj.playerTwo.hpCurrent - playersObj.playerOne.damage
          console.log('PLAYER TWO UPDATED HP ===>', playerTwoUpdatedHp)
          //update player two HP in database where strava ID matches user
          //update P2 isDefeated status by taking boolean value of "P2 HP > 0"
          const updatedPlayerTwo = await User.update(
            {
              hpCurrent: playerTwoUpdatedHp > 0 ? playerTwoUpdatedHp : 0,
              isDefeated: playerTwoUpdatedHp <= 0
            },
            {
              where: {stravaId: playersObj.playerTwo.stravaId},
              returning: true,
              plain: true
            }
          )
          const updatedPlayerTwoObj = updatedPlayerTwo[1]
          //calculating player 1 energy by subtracting P1 Current Energy by P1 move energy cost
          const playerOneUpdatedEnergy =
            playersObj.playerOne.energyCurrent - playersObj.playerOne.energy
          console.log('PLAYER ONE UPDATED ENERGY ==>', playerOneUpdatedEnergy)
          //update player one energy in database where strava ID matches user
          const updatedPlayerOne = await User.update(
            {energyCurrent: playerOneUpdatedEnergy},
            {
              where: {
                stravaId: playersObj.playerOne.stravaId
              },
              returning: true,
              plain: true
            }
          )
          //After P1 attacks, we check if P2 isDefeated
          if (updatedPlayerTwoObj.isDefeated) {
            // end battle with a win for player 1 and a loss for player 2
            console.log('PLAYER 1 WON, PLAYER 2 LOST')
            const updatePlayerOneHp = await User.update(
              {
                hpCurrent: 100,
                // temporary addition for friends and family night:
                energyCurrent: 300
              },
              {
                where: {
                  stravaId: playersObj.playerOne.stravaId
                }
              }
            )
            const updatePlayerTwoHp = await User.update(
              {
                hpCurrent: 100,
                // temporary addition for friends and family night:
                energyCurrent: 300
              },
              {
                where: {
                  stravaId: playersObj.playerTwo.stravaId
                }
              }
            )
          } else {
            //P2 now attacks after P1
            console.log('PLAYER 2 IS ATTACKING SECOND')
            //calculating player 1 hp by subtracting P1 HP current from P2 move damage
            const playerOneUpdatedHp =
              playersObj.playerOne.hpCurrent - playersObj.playerTwo.damage
            console.log('playerOne updated HP ==>', playerOneUpdatedHp)
            //update player one HP in database where strava ID matches user
            //update P1 isDefeated status by taking boolean value of "P1 HP > 0"
            const updatedPlayerOne = await User.update(
              {
                hpCurrent: playerOneUpdatedHp > 0 ? playerOneUpdatedHp : 0,
                isDefeated: playerOneUpdatedHp <= 0
              },
              {
                where: {stravaId: playersObj.playerOne.stravaId},
                returning: true,
                plain: true
              }
            )
            const updatedPlayerOneObj = updatedPlayerOne[1]
            const playerTwoUpdatedEnergy =
              playersObj.playerTwo.energyCurrent - playersObj.playerTwo.energy
            console.log('player two updated energy', playerTwoUpdatedEnergy)
            const updatedPlayerTwo = await User.update(
              {energyCurrent: playerTwoUpdatedEnergy},
              {
                where: {
                  stravaId: playersObj.playerTwo.stravaId
                }
              }
            )
            if (updatedPlayerOneObj.isDefeated) {
              // end battle with a win for player 2 and a loss for player 1
              console.log('PLAYER 2 WON, PLAYER 1 LOST')
              const updatePlayerOneHp = await User.update(
                {
                  hpCurrent: 100,
                  // temporary addition for friends and family night:
                  energyCurrent: 300
                },
                {
                  where: {
                    stravaId: playersObj.playerOne.stravaId
                  }
                }
              )
              const updatePlayerTwoHp = await User.update(
                {
                  hpCurrent: 100,
                  // temporary addition for friends and family night:
                  energyCurrent: 300
                },
                {
                  where: {
                    stravaId: playersObj.playerTwo.stravaId
                  }
                }
              )
            } else {
              // move on to next round
              console.log('ROUND IS CONCLUDED')
            }
          }
          //if player 2 is faster than player 1, player 2 attacks first
        } else if (playersObj.playerOne.speed < playersObj.playerTwo.speed) {
          console.log('PLAYER 2 IS ATTACKING FIRST')
          //calculating player 1 hp by subtracting P1 HP current from P2 move damage
          const playerOneUpdatedHp =
            playersObj.playerOne.hpCurrent - playersObj.playerTwo.damage
          console.log('playerOne updated hp', playerOneUpdatedHp)
          //update player one HP in database where strava ID matches user
          //update P1 isDefeated status by taking boolean value of "P1 HP > 0"
          const updatedPlayerOne = await User.update(
            {
              hpCurrent: playerOneUpdatedHp > 0 ? playerOneUpdatedHp : 0,
              isDefeated: playerOneUpdatedHp <= 0
            },
            {
              where: {stravaId: playersObj.playerOne.stravaId},
              returning: true,
              plain: true
            }
          )
          console.log('UPDATED PLAYER ONE ============>', updatedPlayerOne)
          const updatedPlayerOneObj = updatedPlayerOne[1]
          console.log('UPDATED PLAYER ONE OBJ =====>', updatedPlayerOneObj)
          //calculating player 2 energy by subtracting P2 Current Energy by P2 move energy cost
          const playerTwoUpdatedEnergy =
            playersObj.playerTwo.energyCurrent - playersObj.playerTwo.energy
          console.log('player two updated energy ==>', playerTwoUpdatedEnergy)
          //updated player two energy in database where strava ID matches user
          const updatedPlayerTwo = await User.update(
            {energyCurrent: playerTwoUpdatedEnergy},
            {
              where: {
                stravaId: playersObj.playerTwo.stravaId
              },
              returning: true,
              plain: true
            }
          )
          //After P2 attacks, we check if P1 is defeated
          if (updatedPlayerOneObj.isDefeated) {
            // end battle with a win for player 2 and a loss for player 1
            console.log('PLAYER 2 WON, PLAYER 1 LOST')
            const updatePlayerOneHp = await User.update(
              {
                hpCurrent: 100,
                // temporary addition for friends and family night:
                energyCurrent: 300
              },
              {
                where: {
                  stravaId: playersObj.playerOne.stravaId
                }
              }
            )
            const updatePlayerTwoHp = await User.update(
              {
                hpCurrent: 100,
                // temporary addition for friends and family night:
                energyCurrent: 300
              },
              {
                where: {
                  stravaId: playersObj.playerTwo.stravaId
                }
              }
            )
          } else {
            console.log('PLAYER 1 IS ATTACKING SECOND')
            //calculating player 2 hp by subtracting P2 HP current by P1 move damage
            const playerTwoUpdatedHp =
              playersObj.playerTwo.hpCurrent - playersObj.playerOne.damage
            console.log('player two updated hp ==>', playerTwoUpdatedHp)
            //update player two HP in database where strava ID matches user
            //update P2 isDefeated status by taking boolean value of "P2 HP > 0"
            const updatedPlayerTwo = await User.update(
              {
                hpCurrent: playerTwoUpdatedHp > 0 ? playerTwoUpdatedHp : 0,
                isDefeated: playerTwoUpdatedHp <= 0
              },
              {
                where: {stravaId: playersObj.playerTwo.stravaId},
                returning: true,
                plain: true
              }
            )
            console.log('UPDATED PLAYER TWO =====>', updatedPlayerTwo)
            const updatedPlayerTwoObj = updatedPlayerTwo[1]
            console.log('UPDATED PLAYER TWO OBJ', updatedPlayerTwoObj)
            //calculating player 1 energy by subtracting P1 Current Energy by P1 move energy cost
            const playerOneUpdatedEnergy =
              playersObj.playerOne.energyCurrent - playersObj.playerOne.energy
            console.log('player one updatd energy', playerOneUpdatedEnergy)
            //update player one energy in database where strava ID matches user
            const updatedPlayerOne = await User.update(
              {energyCurrent: playerOneUpdatedEnergy},
              {
                where: {
                  stravaId: playersObj.playerOne.stravaId
                },
                returning: true,
                plain: true
              }
            )

            //After P1 attacks, we check if P2 isDefeated
            if (updatedPlayerTwoObj.isDefeated) {
              // end battle with a win for player 1 and a loss for player 2
              console.log('PLAYER 1 WON, PLAYER 2 LOST')
              const updatePlayerOneHp = await User.update(
                {
                  hpCurrent: 100,
                  // temporary addition for friends and family night:
                  energyCurrent: 300
                },
                {
                  where: {
                    stravaId: playersObj.playerOne.stravaId
                  }
                }
              )
              const updatePlayerTwoHp = await User.update(
                {
                  hpCurrent: 100,
                  // temporary addition for friends and family night:
                  energyCurrent: 300
                },
                {
                  where: {
                    stravaId: playersObj.playerTwo.stravaId
                  }
                }
              )
            } else {
              // move on to next round
              console.log('ROUND IS CONCLUDED')
            }
          }
        }
        // else {
        //   const coinToss = Math.random() * 100
        //   if (coinToss >= 50) {
        //     console.log('I AM ATTACKING FIRST BY COIN FLIP')
        //     store.dispatch(updateOpponentStatsActionCreator(roundOpponent))
        //     // implement some method of retrieving updated isDefeated status
        //     if (opponentIsDefeated) {
        //       // end battle
        //     } else {
        //       store.dispatch(updateMyStatsActionCreator(roundMe))
        //     }
        //   } else {
        //     console.log('OPPONENT IS ATTACKING FIRST BY COIN FLIP')
        //     store.dispatch(updateMyStatsActionCreator(roundMe))
        //     // implement some method of retrieving updated isDefeated status
        //     if (myIsDefeated) {
        //       // end battle with a loss
        //     } else {
        //       store.dispatch(updateOpponentStatsActionCreator(roundOpponent))
        //     }
        //   }
        // }
        // end battle logic from client side
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

      console.log('disconnecting player', playersObj)
    })
  })
}
