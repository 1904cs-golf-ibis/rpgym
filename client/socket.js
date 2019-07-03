import io from 'socket.io-client'
import store from './store'
import {gotNewBattleMessageActionCreator} from './store/battle'

const socket = io(window.location.origin)

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

  // if(message.playerOne.socketId === socket.id) {
  // }
})

export default socket
