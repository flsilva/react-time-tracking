import {
  EMAIL_SIGN_IN,
  EMAIL_SIGN_IN_SUCCESS,
  EMAIL_SIGN_IN_ERROR,
  EMAIL_SIGN_UP,
  EMAIL_SIGN_UP_SUCCESS,
  EMAIL_SIGN_UP_ERROR,
  EMAIL_SIGN_OUT
} from './Auth.Actions'

export default (state = {}, action) => {
  console.log('Auth.Reducers()')
  console.log('state:', state)
  console.log('action:', action)

  switch (action.type) {
    case EMAIL_SIGN_IN:
    case EMAIL_SIGN_UP:
      console.log('Auth.Reducers() - case EMAIL_SIGN_IN OR EMAIL_SIGN_UP')
      return {
        isFetching: true
      }
    case EMAIL_SIGN_IN_SUCCESS:
      console.log('Auth.Reducers() - case EMAIL_SIGN_IN_SUCCESS')
      return {
        isFetching: false,
        user: action.payload.user
      }
    case EMAIL_SIGN_UP_SUCCESS:
      console.log('Auth.Reducers() - case EMAIL_SIGN_UP_SUCCESS')
      return {
        isFetching: false
      }
    case EMAIL_SIGN_IN_ERROR:
    case EMAIL_SIGN_UP_ERROR:
      console.log('Auth.Reducers() - case EMAIL_SIGN_IN_ERROR OR EMAIL_SIGN_UP_ERROR')
      return {
        isFetching: false,
        error: action.payload
      }
    case EMAIL_SIGN_OUT:
      console.log('Auth.Reducers() - case EMAIL_SIGN_OUT')
      return {}
    default:
      return state
  }
}
