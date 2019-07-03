import io from 'socket.io-client'
import store from './store'
import {gotNewBattleMessageActionCreator} from './store/battle'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('new-message', message => {
  console.log('message: ', message)
  store.dispatch(gotNewBattleMessageActionCreator(message))
})

export default socket
