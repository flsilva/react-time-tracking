import ApiFetcher from './ApiFetcher'
import { newTokenReceived } from '../auth/AuthActions'
import { signOutSuccess } from '../auth/sign-out/SignOutActions'
import extractHeaders from './extractHeaders'

import {
  addApiPathToRequest,
  addContentTypeJsonToRequest,
  addCorsModeToRequest,
  addStateTokenToRequest,
  addLocalStorageTokenToRequest
} from './requestHandlers'

import {
  removeTokenFromLocalStorage,
  unauthorizedResponseHandler,
  addResponseTokenToState,
  addResponseTokenToLocalStorage,
  returnJsonResponse
} from './responseHandlers'

const STORAGE_TOKEN_ID = 'APP_TOKEN'
const unauthorizedMessage = 'Your session has expired, please sign in again.'

const tokenHeaderKeys = [
  'access-token',
  'client',
  'expiry',
  'token-type',
  'uid'
]

let dispatch
let getState

const apiConfig = (dispatch, getState) => {
  if (!dispatch) throw new Error('Argument <dispatch> must not be null.')
  if (!getState) throw new Error('Argument <getState> must not be null.')

  const config = {
    dispatch: dispatch,
    apiPath: 'http://127.0.0.1:3000/',
    requestHandlers: [
      addApiPathToRequest,
      addContentTypeJsonToRequest,
      addCorsModeToRequest,
      addStateTokenToRequest(getState),
      addLocalStorageTokenToRequest(STORAGE_TOKEN_ID)
    ],
    successResponseHandlers: [
      removeTokenFromLocalStorage(STORAGE_TOKEN_ID),
      unauthorizedResponseHandler(dispatch, signOutSuccess, unauthorizedMessage),
      addResponseTokenToState(dispatch, newTokenReceived, extractHeaders(tokenHeaderKeys)),
      addResponseTokenToLocalStorage(extractHeaders(tokenHeaderKeys), STORAGE_TOKEN_ID),
      returnJsonResponse
    ]
  }

  return config
}

export const init = (_dispatch, _getState) => {
  dispatch = _dispatch
  getState = _getState
}

export const getFetcher = () => (
  new ApiFetcher(apiConfig(dispatch, getState))
)

export default apiConfig