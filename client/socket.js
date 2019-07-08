import io from 'socket.io-client'
import store from './store'
import {
  gotNewBattleMessageActionCreator,
  updateMyStatsActionCreator,
  updateOpponentStatsActionCreator
} from './store/battle'

// const socket = io(window.location.origin)
const socket = io.connect('https://rpgym.herokuapp.com/')

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
})

export default socket
