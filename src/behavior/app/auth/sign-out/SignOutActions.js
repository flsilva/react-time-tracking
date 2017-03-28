import { apiRequest } from '../../api/ApiActions'
import { extractApiErrors } from '../../api/ApiErrors'

export const SIGN_OUT_START = 'SIGN_OUT_START'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'
export const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR'

const signOutStart = () => ({ type: SIGN_OUT_START })
export const signOutSuccess = (payload) => ({ type: SIGN_OUT_SUCCESS, payload })
const signOutError = (payload) => ({ type: SIGN_OUT_ERROR, payload })

export const signOut = () => (
  (dispatch) => {
    console.log('SignOutActions::signOut()')

    dispatch(signOutStart())

    const errorHandler = (error) => {
      console.log('SignOutActions::signOut().errorHandler() - error: ', error)

      error = extractApiErrors(error)
      dispatch(signOutError(error))
      return new Promise((resolve, reject) => reject(error))
    }

    const successHandler = (json) => {
      console.log('SignOutActions::signOut().successHandler() - json: ', json)
      dispatch(signOutSuccess(json.data))
      return json.data
    }

    const opts = {
      method: 'DELETE'
    }

    const payload = {
      opts,
      path: 'auth/sign_out',
      signOut: true
    }

    return dispatch(apiRequest(payload)).then(successHandler).catch(errorHandler)
  }
)
