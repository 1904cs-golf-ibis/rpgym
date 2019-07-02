import axios from 'axios'

const initialState = []

const GET_BATTLE_MESSAGES = 'GET_BATTLE_MESSAGES'

const getBattleMessages = messages => ({type: GET_BATTLE_MESSAGES, messages})
