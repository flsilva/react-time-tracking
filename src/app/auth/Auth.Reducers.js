import {
  EMAIL_SIGN_IN,
  EMAIL_SIGN_IN_SUCCESS,
  EMAIL_SIGN_IN_ERROR,
  EMAIL_SIGN_UP,
  EMAIL_SIGN_UP_SUCCESS,
  EMAIL_SIGN_UP_ERROR,
  EMAIL_SIGN_OUT_SUCCESS,
  EMAIL_SIGN_OUT_ERROR,
  NEW_TOKEN,
  TOKEN_SIGN_IN_START,
  TOKEN_SIGN_IN_SUCCESS,
  TOKEN_SIGN_IN_ERROR
} from './Auth.Actions'

export default (state = {}, action) => {
  console.log('Auth.Reducers() - action.type: ' + action.type)
  console.log('state:', state)
  console.log('action:', action)

  switch (action.type) {
    case NEW_TOKEN:
      return Object.assign({}, state, { headers: action.payload })
    case EMAIL_SIGN_IN:
    case EMAIL_SIGN_UP:
    case TOKEN_SIGN_IN_START:
      return {
        isFetching: true
      }
    case EMAIL_SIGN_IN_SUCCESS:
    case TOKEN_SIGN_IN_SUCCESS:
      /*return {
        user: action.payload
      }*/
      return Object.assign({}, state, { user: action.payload, isFetching: false })
    case EMAIL_SIGN_UP_SUCCESS:
      return {}
    case EMAIL_SIGN_IN_ERROR:
    case EMAIL_SIGN_UP_ERROR:
    case TOKEN_SIGN_IN_ERROR:
      return { error: action.payload }
    case EMAIL_SIGN_OUT_SUCCESS:
    case EMAIL_SIGN_OUT_ERROR:
      return {}
    default:
      return state
  }
}
