import { combineReducers } from 'redux'
import {
  LOCAL_TOKEN_SIGN_IN_START,
  LOCAL_TOKEN_SIGN_IN_SUCCESS,
  LOCAL_TOKEN_SIGN_IN_ERROR
} from './LocalTokenSignInActions'

const isFetching = (state = null, action) => {
  switch (action.type) {
    case LOCAL_TOKEN_SIGN_IN_START:
      return true

    case LOCAL_TOKEN_SIGN_IN_SUCCESS:
    case LOCAL_TOKEN_SIGN_IN_ERROR:
      return false

    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case LOCAL_TOKEN_SIGN_IN_ERROR:
      return action.payload || null

    case LOCAL_TOKEN_SIGN_IN_START:
    case LOCAL_TOKEN_SIGN_IN_SUCCESS:
      return null

    default:
      return state
  }
}

export default combineReducers({
  isFetching,
  error
})
