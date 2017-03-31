import { combineReducers } from 'redux'
import {
  RESTORE_SESSION_START,
  RESTORE_SESSION_SUCCESS,
  RESTORE_SESSION_ERROR
} from './RestoreSessionActions'

const isFetching = (state = null, action) => {
  switch (action.type) {
    case RESTORE_SESSION_START:
      return true

    case RESTORE_SESSION_SUCCESS:
    case RESTORE_SESSION_ERROR:
      return false

    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case RESTORE_SESSION_ERROR:
      return action.payload || null

    case RESTORE_SESSION_START:
    case RESTORE_SESSION_SUCCESS:
      return null

    default:
      return state
  }
}

export default combineReducers({
  isFetching,
  error
})
