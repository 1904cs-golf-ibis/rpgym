import io from 'socket.io-client'
import store from './store'
import {
  gotNewBattleMessageActionCreator,
  updatedMyStatsActionCreator,
  updatedOpponentStatsActionCreator
} from './store/battle'

// const socket = io(window.location.origin)
const socket = io.connect('http://localhost:8080/')
// const socket = io.connect('https://rpgym.herokuapp.com/')

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('new-message', message => {
  console.log('message =====> ', message)
  store.dispatch(gotNewBattleMessageActionCreator(message))
})

socket.on('new-round', message => {
  console.log('THIS IS MY SOCKET ID ===>', socket.id)
  console.log('ROUND IN CLIENT ====>', message)
  console.log('MESSAGE SOCKET ID', message.playerOne)

  //Later on, we can input logic that tells us that playerOne has 'this' socket ID, but since we're not certain now,
  //here is where the playerObjs are assigned (and ultimately passed to the action creators)
  const roundMe =
    message.playerOne.socketId === socket.id
      ? message.playerOne
      : message.playerTwo
  const roundOpponent =
    message.playerOne.socketId !== socket.id
      ? message.playerOne
      : message.playerTwo
  console.log('MY ROUND DATA', roundMe)
  console.log('OPPONENT ROUND DATA', roundOpponent)

  const {
    curAttack,
    mySpeed,
    myIsDefeated,
    opponentSpeed,
    opponentIsDefeated
  } = message.data

  // if (mySpeed > opponentSpeed) {
  //   console.log('I AM ATTACKING FIRST')
  //   store.dispatch(updatedOpponentStatsActionCreator(roundOpponent))
  //   // implement some method of retrieving updated isDefeated status
  //   if (opponentIsDefeated) {
  //     // end battle with a win
  //     console.log('YOU WIN!')
  //   } else {
  //     store.dispatch(updatedMyStatsActionCreator(roundMe))
  //     if (myIsDefeated) {
  //       // end battle with a loss
  //       console.log('you lose...')
  //     }
  //   }
  // } else if (mySpeed < opponentSpeed) {
  //   console.log('OPPONENT IS ATTACKING FIRST')
  //   store.dispatch(updatedMyStatsActionCreator(roundMe))
  //   // implement some method of retrieving updated isDefeated status
  //   if (myIsDefeated) {
  //     // end battle with a loss
  //     console.log('you lose...')
  //   } else {
  //     store.dispatch(updatedOpponentStatsActionCreator(roundOpponent))
  //     if (opponentIsDefeated) {
  //       // end battle with a win
  //       console.log('YOU WIN!')
  //     }
  //   }
  // }
  // else {
  //   const coinToss = Math.random() * 100
  //   if (coinToss >= 50) {
  //     console.log('I AM ATTACKING FIRST BY COIN FLIP')
  //     store.dispatch(updateOpponentStatsActionCreator(roundOpponent))
  //     // implement some method of retrieving updated isDefeated status
  //     if (opponentIsDefeated) {
  //       // end battle with a win
  //       console.log('YOU WIN!')
  //     } else {
  //       store.dispatch(updateMyStatsActionCreator(roundMe))
  //       if (myIsDefeated) {
  //         // end battle with a loss
  //         console.log('you lose...')
  //       }
  //     }
  //   } else {
  //     console.log('OPPONENT IS ATTACKING FIRST BY COIN FLIP')
  //     store.dispatch(updateMyStatsActionCreator(roundMe))
  //     // implement some method of retrieving updated isDefeated status
  //     if (myIsDefeated) {
  //       // end battle with a loss
  //       console.log('you lose...')
  //     } else {
  //       store.dispatch(updateOpponentStatsActionCreator(roundOpponent))
  //       if (opponentIsDefeated) {
  //         // end battle with a win
  //         console.log('YOU WIN!')
  //       }
  //     }
  //   }
  // }
})

export default socket
