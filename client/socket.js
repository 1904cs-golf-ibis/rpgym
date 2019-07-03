import io from 'socket.io-client'
import store, {gotNewBattleMessageActionCreator} from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('new-message', message => {
  store.dispatch(gotNewBattleMessageActionCreator(message))
})

export default socket
