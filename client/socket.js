import io from 'socket.io-client'
import store from './store'
import {
  gotNewBattleMessageActionCreator,
  updateMyStatsActionCreator,
  updateOpponentStatsActionCreator,
  getMyStatsThunkCreator,
  getOpponentStatsThunkCreator
} from './store/battle'
import {getAllNotifications} from './store/user'

// const socket = io(window.location.origin)
const socket = io('http://localhost:8080')
// const socket = io.connect('https://rpgym.herokuapp.com/')

socket.on('connect', () => {
  console.log('Connected!')
})

// socket.on('me', data => {
//   console.log('HERE IS ME!!!', data)
// })

socket.on('new-message', message => {
  console.log('message =====> ', message)
  store.dispatch(gotNewBattleMessageActionCreator(message))
})

socket.on('challenge-issued', msg => {
  console.log('CHALLENGE ISSUED IN THE CLIENT', msg)
  store.dispatch(getAllNotifications(msg))
})

socket.on('opponent-attack-message', attackMessage => {
  console.log('I AM THE ATTACK MESSAGE IN THE CLIENT', attackMessage)
  //not sure if this is similar to line 24. Not entirely sure if 'new-message' in the
  //client is actually doing anything. Maybe I just rewrote code...
  //also, my need to extract just the message in the attackMessage obj before sending it
  const sendingJustText = attackMessage.text
  store.dispatch(gotNewBattleMessageActionCreator(sendingJustText))
})

socket.on('new-round', message => {
  console.log('THIS IS MY SOCKET ID ===>', socket.id)
  console.log('ROUND IN CLIENT ====>', message)
  console.log('MESSAGE SOCKET ID', message.playerOne)
  const myStravaId =
    message.playerOne.socketId === socket.id
      ? message.playerOne.stravaId
      : message.playerTwo.stravaId
  const opponentStravaId =
    message.playerOne.socketId !== socket.id
      ? message.playerOne.stravaId
      : message.playerTwo.stravaId
  store.dispatch(getMyStatsThunkCreator(myStravaId))
  store.dispatch(getOpponentStatsThunkCreator(opponentStravaId))

  //Later on, we can input logic that tells us that playerOne has 'this' socket ID, but since we're not certain now,
  //here is where the playerObjs are assigned (and ultimately passed to the action creators)
  // const roundMe =
  //   message.playerOne.socketId === socket.id
  //     ? message.playerOne
  //     : message.playerTwo
  // const roundOpponent =
  //   message.playerOne.socketId !== socket.id
  //     ? message.playerOne
  //     : message.playerTwo
  // console.log('MY ROUND DATA', roundMe)
  // console.log('OPPONENT ROUND DATA', roundOpponent)
})

export default socket
