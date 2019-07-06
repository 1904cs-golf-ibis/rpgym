import io from 'socket.io-client'
import store from './store'
import {
  gotNewBattleMessageActionCreator,
  updateMyStatsActionCreator,
  updateOpponentStatsActionCreator
} from './store/battle'

const socket = io(window.location.origin)
// const socket = io.connect('http://localhost:8080/battle')

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('new-message', message => {
  console.log('message =====> ', message)
  store.dispatch(gotNewBattleMessageActionCreator(message))
  // console.log('IN THE SOCKET.JS')
  // console.log('socket: >>>>>>>>>>>>>>>>>>>>', socket)
  // socket.broadcast.emit('broadcast', message)
})

socket.on('new-round', message => {
  console.log('THIS IS MY SOCKET ID ===>', socket.id)
  console.log('ROUND IN CLIENT ====>', message)
  // const opponentSocketId = Object.keys(message).filter(currentSocketId => currentSocketId !== socket.id)[0]
  // const opponentSocketId = message.playerOne.socketId === socket.id ? message.playerTwo.socketId : message.playOne.socketId
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

  // console.log('This should be a truthy obj', message.playerOne[socket.id])
  // store.dispatch(updateMyStatsActionCreator(message.playerOne[socket.id]))
  // store.dispatch(updateOpponentStatsActionCreator(message.playerTwo[opponentSocketId]))

  store.dispatch(updateMyStatsActionCreator(roundMe))
  store.dispatch(updateOpponentStatsActionCreator(roundOpponent))

  // if(message.playerOne.socketId === socket.id) {
  // }
})

export default socket
