import { combineReducers } from 'redux'
import { NEW_TOKEN_RECEIVED } from './AuthActions'
import { SIGN_OUT_SUCCESS } from './sign-out/SignOutActions'
import { EMAIL_SIGN_IN_SUCCESS } from './email/EmailSignInActions'
import { RESTORE_SESSION_SUCCESS } from './restore-session/RestoreSessionActions'
import emailSignIn from './email/EmailSignInReducers'
import emailSignUp from './email/EmailSignUpReducers'
import restoreSession from './restore-session/RestoreSessionReducers'
import signOut from './sign-out/SignOutReducers'

const user = (state = null, action) => {
  switch (action.type) {
    case EMAIL_SIGN_IN_SUCCESS:
    case RESTORE_SESSION_SUCCESS:
      console.log('AuthReducers::user() - case RESTORE_SESSION_SUCCESS OR EMAIL_SIGN_IN_SUCCESS')
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
      console.log('AuthReducers::token() - case NEW_TOKEN_RECEIVED')
      return action.payload || null

    case SIGN_OUT_SUCCESS:
      return null

    default:
      return state
  }
}

export default combineReducers({
  restoreSession,
  emailSignIn,
  emailSignUp,
  signOut,
  token,
  user
})
