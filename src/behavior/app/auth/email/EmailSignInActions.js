import { apiRequest } from '../../api/ApiActions'
import { extractApiErrors } from '../../api/ApiErrors'

export const EMAIL_SIGN_IN_START = 'EMAIL_SIGN_IN_START'
export const EMAIL_SIGN_IN_SUCCESS = 'EMAIL_SIGN_IN_SUCCESS'
export const EMAIL_SIGN_IN_ERROR = 'EMAIL_SIGN_IN_ERROR'

const emailSignInStart = () => ({ type: EMAIL_SIGN_IN_START })
const emailSignInSuccess = (payload) => ({ type: EMAIL_SIGN_IN_SUCCESS, payload })
const emailSignInError = (payload) => ({ type: EMAIL_SIGN_IN_ERROR, payload })

export const emailSignIn = (email, password) => (
  (dispatch) => {
    console.log('EmailSignInActions::emailSignIn()')

    dispatch(emailSignInStart())

    const errorHandler = (error) => {
      console.log('EmailSignInActions::emailSignIn().errorHandler() - error: ', error)

      error = extractApiErrors(error)
      dispatch(emailSignInError(error))
      return new Promise((resolve, reject) => reject(error))
    }

    const successHandler = (json) => {
      console.log('EmailSignInActions::emailSignIn().successHandler() - json: ', json)
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
