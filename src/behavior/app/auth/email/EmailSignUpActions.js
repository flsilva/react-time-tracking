import { getFetcher } from '../../api/ApiConfig'
import { extractApiErrors } from '../../api/ApiErrors'

export const EMAIL_SIGN_UP_START = 'EMAIL_SIGN_UP_START'
export const EMAIL_SIGN_UP_SUCCESS = 'EMAIL_SIGN_UP_SUCCESS'
export const EMAIL_SIGN_UP_ERROR = 'EMAIL_SIGN_UP_ERROR'

const emailSignUpStart = () => ({ type: EMAIL_SIGN_UP_START })
const emailSignUpSuccess = (payload) => ({ type: EMAIL_SIGN_UP_SUCCESS, payload })
const emailSignUpError = (payload) => ({ type: EMAIL_SIGN_UP_ERROR, payload })

export const emailSignUp = (email, password, confirmPassword) => (
  (dispatch) => {
    console.log('EmailSignUpActions::emailSignUp()')

    dispatch(emailSignUpStart())

    const errorHandler = (error) => {
      console.log('EmailSignInActions::emailSignUp().errorHandler() - error: ', error)

      error = extractApiErrors(error)
      dispatch(emailSignUpError(error))
      return new Promise((resolve, reject) => reject(error))
    }

    const successHandler = (json) => {
      console.log('EmailSignUpActions::emailSignUp().successHandler() - json: ', json)
      dispatch(emailSignUpSuccess(json.data))
      return json.data
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

    return getFetcher().fetch(payload).then(successHandler).catch(errorHandler)
  }
)
