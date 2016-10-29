import { USER_LOGGED_IN, USER_LOGGED_OUT } from './User.Actions'

export default (state = {}, action) => {
  console.log('User.Reducers().users()')
  console.log('state:', state)
  console.log('action:', action)

  switch (action.type) {
    case USER_LOGGED_IN:
      console.log('User.Reducers().users() - case USER_LOGGED_IN')
      return action.payload
    case USER_LOGGED_OUT:
      console.log('User.Reducers().users() - case USER_LOGGED_OUT')
      return {}
    default:
      return state
  }
}
