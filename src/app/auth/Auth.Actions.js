import { apiRequest } from '../api/Api.Actions'

export const NEW_TOKEN = 'NEW_TOKEN'

export const EMAIL_SIGN_IN = 'EMAIL_SIGN_IN'
export const EMAIL_SIGN_IN_SUCCESS = 'EMAIL_SIGN_IN_SUCCESS'
export const EMAIL_SIGN_IN_ERROR = 'EMAIL_SIGN_IN_ERROR'

export const EMAIL_SIGN_UP = 'EMAIL_SIGN_UP'
export const EMAIL_SIGN_UP_SUCCESS = 'EMAIL_SIGN_UP_SUCCESS'
export const EMAIL_SIGN_UP_ERROR = 'EMAIL_SIGN_UP_ERROR'

export const EMAIL_SIGN_OUT_SUCCESS = 'EMAIL_SIGN_OUT_SUCCESS'
export const EMAIL_SIGN_OUT_ERROR = 'EMAIL_SIGN_OUT_ERROR'

export const TOKEN_SIGN_IN_START = 'TOKEN_SIGN_IN_START'
export const TOKEN_SIGN_IN_SUCCESS = 'TOKEN_SIGN_IN_SUCCESS'
export const TOKEN_SIGN_IN_ERROR = 'TOKEN_SIGN_IN_ERROR'

export const newToken = (payload) => ({ type: NEW_TOKEN, payload })

const _emailSignIn = () => ({ type: EMAIL_SIGN_IN })
const emailSignInSuccess = (payload) => ({ type: EMAIL_SIGN_IN_SUCCESS, payload })
const emailSignInError = (payload) => ({ type: EMAIL_SIGN_IN_ERROR, payload })

const _emailSignUp = () => ({ type: EMAIL_SIGN_UP })
const emailSignUpSuccess = (payload) => ({ type: EMAIL_SIGN_UP_SUCCESS, payload })
const emailSignUpError = (payload) => ({ type: EMAIL_SIGN_UP_ERROR, payload })

const emailSignOutSuccess = () => ({ type: EMAIL_SIGN_OUT_SUCCESS })
const emailSignOutError = () => ({ type: EMAIL_SIGN_OUT_ERROR })

const tokenSignInStart = () => ({ type: TOKEN_SIGN_IN_START })
const tokenSignInSuccess = (payload) => ({ type: TOKEN_SIGN_IN_SUCCESS, payload })
const tokenSignInError = (payload) => ({ type: TOKEN_SIGN_IN_ERROR, payload })

export const tokenSignIn = () => (
  (dispatch) => {
    dispatch(tokenSignInStart())

    const errorHandler = (error) => {
      console.log('Auth.Actions::validateToken().errorHandler() - error: ', error)
      dispatch(tokenSignInError(error))
      return new Promise((resolve, reject) => reject(error))
    }

    const successHandler = (json) => {
      console.log('Auth.Actions::validateToken().successHandler() - json: ', json)
      dispatch(tokenSignInSuccess(json.data))
      return json.data
    }

    const opts = {
      method: 'GET'
    }

    const payload = {
      opts,
      path: 'auth/validate_token',
      authToken: true
    }

    return dispatch(apiRequest(payload)).then(successHandler).catch(errorHandler)
  }
)

export const emailSignIn = (email, password) => (
  (dispatch) => {
    console.log('Auth.Actions::emailSignIn()')

    dispatch(_emailSignIn())

    const errorHandler = (error) => {
      console.log('Auth.Actions::emailSignIn().errorHandler() - error: ', error)

      let _error

      if (error && error.errors && error.errors.full_messages) {
        _error = error.errors.full_messages
      } else if (error && error.errors) {
        _error = error.errors
      } else if (error && error.error) {
        _error = error.error
      } else if (error) {
        _error = error
      } else {
        _error = 'There was an error trying to sign you in, please try again.'
      }

      dispatch(emailSignInError(_error))
      return new Promise((resolve, reject) => reject(_error))
    }

    const successHandler = (json) => {
      console.log('Auth.Actions::emailSignIn().successHandler() - json: ', json)
      dispatch(emailSignInSuccess(json.data))
      return json.data
    }

    const opts = {
      body: JSON.stringify({
        email: email,
        password: password
      }),
      method: 'POST'
    }

    const payload = {
      opts,
      path: 'auth/sign_in',
      signIn: true
    }

    return dispatch(apiRequest(payload)).then(successHandler).catch(errorHandler)
  }
)

export const emailSignUp = (email, password, confirmPassword) => (
  (dispatch) => {
    dispatch(_emailSignUp())

    const errorHandler = (error) => {
      console.log('emailSignUp().errorHandler() - error: ', error)

      let _error

      if (error && error.errors && error.errors.full_messages) {
        _error = error.errors.full_messages
      } else if (error && error.errors) {
        _error = error.errors
      } else if (error && error.error) {
        _error = error.error
      } else if (error) {
        _error = error
      } else {
        _error = 'There was an error trying to sign you up, please try again.'
      }

      dispatch(emailSignUpError(_error))
      return new Promise((resolve, reject) => reject(_error))
    }

    const successHandler = (json) => {
      console.log('Auth.Actions::emailSignUp().successHandler() - json: ', json)
      dispatch(emailSignUpSuccess(json.data))
      return json
    }

    const opts = {
      body: JSON.stringify({
        email: email,
        password: password,
        password_confirmation: confirmPassword,
        confirm_success_url: 'http://127.0.0.1:3001/sign-up/confirmation'
      }),
      method: 'POST'
    }

    const payload = {
      opts,
      path: 'auth'
    }

    return dispatch(apiRequest(payload)).then(successHandler).catch(errorHandler)
  }
)

export const emailSignOut = () => (
  (dispatch) => {
    console.log('Auth.Actions::emailSignOut()')

    const errorHandler = (error) => {
      console.log('Auth.Actions::emailSignOut().errorHandler() - error: ', error)
      dispatch(emailSignOutError())
      return new Promise((resolve, reject) => reject(error))
    }

    const successHandler = (json) => {
      console.log('Auth.Actions::emailSignOut().emailSignOut() - json: ', json)
      dispatch(emailSignOutSuccess())
      return json
    }

    const opts = {
      method: 'DELETE'
    }

    const payload = {
      opts,
      path: 'auth/sign_out',
      signOut: true
    }

    dispatch(apiRequest(payload)).then(successHandler).catch(errorHandler)
  }
)
