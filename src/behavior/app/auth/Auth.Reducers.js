import { combineReducers } from 'redux'
import {
  EMAIL_SIGN_IN_START,
  EMAIL_SIGN_IN_SUCCESS,
  EMAIL_SIGN_IN_ERROR,
  EMAIL_SIGN_UP_START,
  EMAIL_SIGN_UP_SUCCESS,
  EMAIL_SIGN_UP_ERROR,
  EMAIL_SIGN_OUT_SUCCESS,
  EMAIL_SIGN_OUT_ERROR,
  NEW_TOKEN,
  TOKEN_SIGN_IN_START,
  TOKEN_SIGN_IN_SUCCESS,
  TOKEN_SIGN_IN_ERROR
} from './Auth.Actions'


const tokenSignIn = () => {

  const headers = (state = null, action) => {
    // THINK ABOUT CREATING A NEW KILL_TOKEN, FIRED AFTER SIGN_OUT,
    // TO CLEAR HEADERS HERE
    switch (action.type) {
      case NEW_TOKEN:
        return action.payload

      default:
        return state
    }
  }

  const isFetching = (state = null, action) => {
    switch (action.type) {
      case TOKEN_SIGN_IN_START:
        return true

      case TOKEN_SIGN_IN_SUCCESS:
      case TOKEN_SIGN_IN_ERROR:
        return false

      default:
        return state
    }
  }

  const error = (state = null, action) => {
    switch (action.type) {
      case TOKEN_SIGN_IN_ERROR:
        return action.payload || null

      case TOKEN_SIGN_IN_START:
      case TOKEN_SIGN_IN_SUCCESS:
        return null

      default:
        return state
    }
  }

  return combineReducers({
    headers,
    isFetching,
    error
  })
}

const emailSignIn = () => {

  const isFetching = (state = null, action) => {
    switch (action.type) {
      case EMAIL_SIGN_IN_START:
        return true

      case EMAIL_SIGN_IN_SUCCESS:
      case EMAIL_SIGN_IN_ERROR:
        return null

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

  return combineReducers({
    isFetching,
    error
  })
}

const emailSignUp = () => {

  const isFetching = (state = null, action) => {
    switch (action.type) {
      case EMAIL_SIGN_UP_START:
        return true

      case EMAIL_SIGN_UP_SUCCESS:
      case EMAIL_SIGN_UP_ERROR:
        return null

      default:
        return state
    }
  }

  const error = (state = null, action) => {
    switch (action.type) {
      case EMAIL_SIGN_UP_ERROR:
        return action.payload || null

      case EMAIL_SIGN_UP_START:
      case EMAIL_SIGN_UP_SUCCESS:
        return null

      default:
        return state
    }
  }

  return combineReducers({
    isFetching,
    error
  })
}

const user = (state = null, action) => {
  switch (action.type) {
    case EMAIL_SIGN_IN_SUCCESS:
    case TOKEN_SIGN_IN_SUCCESS:
      return action.payload || null

    case EMAIL_SIGN_OUT_SUCCESS:
    case EMAIL_SIGN_OUT_ERROR:
      return null

    default:
      return state
  }
}

export default combineReducers({
  tokenSignIn: tokenSignIn(),
  emailSignIn: emailSignIn(),
  emailSignUp: emailSignUp(),
  user
})
