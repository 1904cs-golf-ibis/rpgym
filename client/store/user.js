import axios from 'axios'
import history from '../history'
import socket from '../socket'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const UPDATE_USER_SPEED = 'UPDATE_USER_SPEED'

/**
 * INITIAL STATE
 */
const initialState = {
  allUsers: [],
  singleUser: {}
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const updateUserSpeed = speed => ({type: UPDATE_USER_SPEED, speed})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState.singleUser))
    socket.emit('connection', res.data)
    console.log('IN THE REDUCER USER')
    console.log('socket: >>>>>>>>>>>>>>>>>>>>', socket)
  } catch (err) {
    console.error(err)
  }
}

export const allUsersThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(getAllUsers(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const updateSpeedThunkCreator = speedObj => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${speedObj.stravaId}`, {
      speed: speedObj.speed
    })
    dispatch(updateUserSpeed(speedObj.speed))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, singleUser: action.user}
    case GET_ALL_USERS:
      return {...state, allUsers: action.users}
    case REMOVE_USER:
      return {...state, singleUser: {}}
    default:
      return state
  }
}
