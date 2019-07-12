import io from 'socket.io-client'
import store from './store'
import {
  gotNewBattleMessageActionCreator,
  getMyStatsThunkCreator,
  getOpponentStatsThunkCreator,
  gotNewAttackMessageActionCreator,
  resetAttackMessages
} from './store/battle'
import {getAllNotifications} from './store/user'

// const socket = io(window.location.origin)
const socket = io('http://localhost:8080')
// const socket = io.connect('https://rpgym.herokuapp.com/')

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('new-message', message => {
  // store.dispatch(gotNewBattleMessageActionCreator(message))
})

socket.on('challenge-issued', msg => {
  store.dispatch(getAllNotifications(msg))
})

socket.on('opponent-attack-message', attackObj => {
  console.log('I AM THE ATTACK OBJECT IN THE CLIENT', attackObj)
  //break up object into two different messages. one for you, one for opponent and dispatch them to the battle messages part of the store
  const myAttack =
    attackObj.playerOne.socketId === socket.id
      ? `${attackObj.playerOne.name} used ${attackObj.playerOne.attackUsed}`
      : `${attackObj.playerTwo.name} used ${attackObj.playerTwo.attackUsed}`
  const opponentAttack =
    attackObj.playerOne.socketId !== socket.id
      ? `${attackObj.playerOne.name} used ${attackObj.playerOne.attackUsed}`
      : `${attackObj.playerTwo.name} used ${attackObj.playerTwo.attackUsed}`
  console.log('MY ATTACK IN THE CLIENT ', myAttack)
  console.log('OPPONENT ATTACK IN THE CLIENT ', opponentAttack)
  store.dispatch(resetAttackMessages())
  setTimeout(
    () =>
      store.dispatch(
        gotNewAttackMessageActionCreator([myAttack, opponentAttack])
      ),
    500
  )
  // store.dispatch(gotNewAttackMessageActionCreator([myAttack, opponentAttack]))
  // store.dispatch(gotNewAttackMessageActionCreator(opponentAttack))
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
