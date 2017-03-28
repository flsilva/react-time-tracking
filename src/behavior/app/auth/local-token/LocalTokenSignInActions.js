import { apiRequest } from '../../api/Api.Actions'
import { extractApiErrors } from '../../api/ApiErrors'

export const LOCAL_TOKEN_SIGN_IN_START = 'LOCAL_TOKEN_SIGN_IN_START'
export const LOCAL_TOKEN_SIGN_IN_SUCCESS = 'LOCAL_TOKEN_SIGN_IN_SUCCESS'
export const LOCAL_TOKEN_SIGN_IN_ERROR = 'LOCAL_TOKEN_SIGN_IN_ERROR'

const localTokenSignInStart = () => ({ type: LOCAL_TOKEN_SIGN_IN_START })
const localTokenSignInSuccess = (payload) => ({ type: LOCAL_TOKEN_SIGN_IN_SUCCESS, payload })
const localTokenSignInError = (payload) => ({ type: LOCAL_TOKEN_SIGN_IN_ERROR, payload })

export const localTokenSignIn = () => (
  (dispatch) => {
    dispatch(localTokenSignInStart())

    const errorHandler = (error) => {
      console.log('LocalTokenSignInActions::validateToken().errorHandler() - error: ', error)

      error = extractApiErrors(error)
      dispatch(localTokenSignInError(error))
      return new Promise((resolve, reject) => reject(error))
    }

    const successHandler = (json) => {
      console.log('LocalTokenSignInActions::validateToken().successHandler() - json: ', json)
      dispatch(localTokenSignInSuccess(json.data))
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
