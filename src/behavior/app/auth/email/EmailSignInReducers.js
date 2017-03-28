import { combineReducers } from 'redux'
import {
  EMAIL_SIGN_IN_START,
  EMAIL_SIGN_IN_SUCCESS,
  EMAIL_SIGN_IN_ERROR
} from './EmailSignInActions'

const isFetching = (state = null, action) => {
  switch (action.type) {
    case EMAIL_SIGN_IN_START:
      return true

    case EMAIL_SIGN_IN_SUCCESS:
    case EMAIL_SIGN_IN_ERROR:
      return false

    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case EMAIL_SIGN_IN_ERROR:
      return action.payload || null

    case EMAIL_SIGN_IN_START:
    case EMAIL_SIGN_IN_SUCCESS:
      return null

    default:
      return state
  }
}

export default combineReducers({
  isFetching,
  error
})
