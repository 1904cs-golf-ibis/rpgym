import axios from 'axios'

//Initial State
const initialState = []

//Action Types
const GET_BATTLE_MESSAGES = 'GET_BATTLE_MESSAGES'

//Action Creators
const getBattleMessages = messages => ({type: GET_BATTLE_MESSAGES, messages})

//Thunks

//Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BATTLE_MESSAGES: {
      return action.messages
    }
    default:
      return state
  }
}
