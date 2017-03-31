import { getFetcher } from '../../api/ApiConfig'
import { extractApiErrors } from '../../api/ApiErrors'

export const RESTORE_SESSION_START = 'RESTORE_SESSION_START'
export const RESTORE_SESSION_SUCCESS = 'RESTORE_SESSION_SUCCESS'
export const RESTORE_SESSION_ERROR = 'RESTORE_SESSION_ERROR'

const restoreSessionStart = () => ({ type: RESTORE_SESSION_START })
const restoreSessionSuccess = (payload) => ({ type: RESTORE_SESSION_SUCCESS, payload })
const restoreSessionError = (payload) => ({ type: RESTORE_SESSION_ERROR, payload })

export const restoreSession = () => (
  (dispatch) => {
    dispatch(restoreSessionStart())

    const errorHandler = (error) => {
      console.log('RestoreSessionActions::restoreSession().errorHandler() - error: ', error)

      error = extractApiErrors(error)
      dispatch(restoreSessionError(error))
      return new Promise((resolve, reject) => reject(error))
    }

    const successHandler = (json) => {
      console.log('RestoreSessionActions::restoreSession().successHandler() - json: ', json)
      dispatch(restoreSessionSuccess(json.data))
      return json.data
    }

    const opts = {
      method: 'GET'
    }

    const payload = {
      opts,
      path: 'auth/validate_token',
      isRecoveringSession: true
    }

    return getFetcher().fetch(payload).then(successHandler).catch(errorHandler)
  }
)
