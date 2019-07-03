import axios from 'axios'

//Initial State
const initialState = []

//Action Types
const GOT_BATTLE_MESSAGES = 'GOT_BATTLE_MESSAGES'
const NEW_BATTLE_MESSAGE = 'NEW_BATTLE_MESSAGE'

//Action Creators
export const gotBattleMessagesActionCreator = messages => ({
  type: GOT_BATTLE_MESSAGES,
  messages
})

export const gotNewBattleMessageActionCreator = message => ({
  type: NEW_BATTLE_MESSAGE,
  message
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
    } catch (error) {
      console.error(error)
    }
  }
}

//Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_BATTLE_MESSAGES: {
      return action.messages
    }
    case NEW_BATTLE_MESSAGE: {
      return [...state, action.message]
    }
    default:
      return state
  }
}
