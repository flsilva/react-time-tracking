import { combineReducers } from 'redux'
import { NEW_TOKEN_RECEIVED } from './Auth.Actions'
import { SIGN_OUT_SUCCESS } from './sign-out/SignOutActions'
import { EMAIL_SIGN_IN_SUCCESS } from './email/EmailSignInActions'
import { LOCAL_TOKEN_SIGN_IN_SUCCESS } from './local-token/LocalTokenSignInActions'
import emailSignIn from './email/EmailSignInReducers'
import emailSignUp from './email/EmailSignUpReducers'
import localTokenSignIn from './local-token/LocalTokenSignInReducers'
import signOut from './sign-out/SignOutReducers'

const user = (state = null, action) => {
  switch (action.type) {
    case EMAIL_SIGN_IN_SUCCESS:
    case LOCAL_TOKEN_SIGN_IN_SUCCESS:
      return action.payload || null

    case SIGN_OUT_SUCCESS:
      return null

    default:
      return state
  }
}

const token = (state = null, action) => {
  // THINK ABOUT CREATING A NEW KILL_TOKEN, FIRED AFTER SIGN_OUT,
  // TO CLEAR HEADERS HERE
  switch (action.type) {
    case NEW_TOKEN_RECEIVED:
      return action.payload || null

    case SIGN_OUT_SUCCESS:
      return null

    default:
      return state
  }
}

export default combineReducers({
  localTokenSignIn,
  emailSignIn,
  emailSignUp,
  signOut,
  token,
  user
})
