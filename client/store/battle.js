// import axios from 'axios'
import socket from '../socket'

//Initial State
const initialState = {
  myStats: {},
  opponentStats: {},
  battleMessages: []
}

//Action Types
const GOT_BATTLE_MESSAGES = 'GOT_BATTLE_MESSAGES'
const NEW_BATTLE_MESSAGE = 'NEW_BATTLE_MESSAGE'
const GOT_MY_STATS = 'GOT_MY_STATS'
const GOT_OPPONENT_STATS = 'GOT_OPPONENT_STATS'

//Action Creators
export const gotBattleMessagesActionCreator = messages => ({
  type: GOT_BATTLE_MESSAGES,
  messages
})

export const gotNewBattleMessageActionCreator = message => ({
  type: NEW_BATTLE_MESSAGE,
  message
})

export const gotMyStatsActionCreator = stats => ({
  type: GOT_MY_STATS,
  stats
})

export const gotOpponentStatsActionCreator = stats => ({
  type: GOT_OPPONENT_STATS,
  stats
})

//Thunks
export const getBattleMessagesThunkCreator = messages => {
  return dispatch => {
    try {
      // const {data} = await axios.get('/api/')
      dispatch(gotBattleMessagesActionCreator(messages))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getNewBattleMessageThunkCreator = message => {
  return dispatch => {
    try {
      // const {data} = await axios.post('/api/')
      dispatch(gotNewBattleMessageActionCreator(message))
      socket.emit('new-message', message)
      console.log('IN THE BATTLE REDUCER')
      console.log('socket: >>>>>>>>>>>>>>>>>>>>', socket)
      // socket.broadcast.emit('broadcast', message)
    } catch (error) {
      console.error(error)
    }
  }
}

//Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_BATTLE_MESSAGES: {
      return {...state, battleMessages: action.messages}
    }
    case NEW_BATTLE_MESSAGE: {
      return {
        ...state,
        battleMessages: [...state.battleMessages, action.message]
      }
    }
    case GOT_MY_STATS: {
      return {...state, myStats: action.stats}
    }
    case GOT_OPPONENT_STATS: {
      return {...state, opponentStats: action.stats}
    }
    default:
      return state
  }
}
