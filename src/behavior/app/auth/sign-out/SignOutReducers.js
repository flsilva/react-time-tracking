import { combineReducers } from 'redux'
import {
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR
} from './SignOutActions'

const isFetching = (state = null, action) => {
  switch (action.type) {
    case SIGN_OUT_START:
      return true

    case SIGN_OUT_SUCCESS:
    case SIGN_OUT_ERROR:
      return false

    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case SIGN_OUT_ERROR:
      return action.payload || null

    case SIGN_OUT_START:
    case SIGN_OUT_SUCCESS:
      return null

    default:
      return state
  }
}

export default combineReducers({
  isFetching,
  error
})
