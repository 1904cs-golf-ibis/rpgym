import io from 'socket.io-client'
import store from './store'
import {
  gotNewBattleMessageActionCreator,
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

socket.on('new-message', message => {
  store.dispatch(gotNewBattleMessageActionCreator(message))
})

socket.on('challenge-issued', msg => {
  store.dispatch(getAllNotifications(msg))
})

socket.on('new-round', message => {
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
})

export default socket
