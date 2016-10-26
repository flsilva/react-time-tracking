import ApiFetcher from './ApiFetcher'
import { newToken, emailSignOut } from '../auth/Auth.Actions'

const STORAGE_TOKEN_ID = 'APP_TOKEN'
const endPoint = 'http://127.0.0.1:3000/'

const headersToCache = [
  'access-token',
  'client',
  'expiry',
  'token-type',
  'uid'
]

const extractHeadersToCache = (headersToCache, response) => {
  let headersCache = {}
  let headerValue

  headersToCache.forEach((headerKey) => {
    headerValue = response.headers.get(headerKey)

    if (headerValue) {
      headersCache[headerKey] = headerValue
    }
  })

  return headersCache
}

export const apiRequest = (payload) => (
  (dispatch, getState) => {
    console.log('Api.Actions::apiRequest() - payload: ', payload)

    if (payload.signOut) {
      localStorage.removeItem(STORAGE_TOKEN_ID)
    }

    const fetcher = new ApiFetcher()
    const url = endPoint + payload.path
    const opts = Object.assign({}, payload.opts)

    if (!opts.headers) {
      opts.headers = new Headers()
    }

    let cachedHeaders
    if (payload.authToken) {
      cachedHeaders = JSON.parse(localStorage.getItem(STORAGE_TOKEN_ID))
    } else {
      cachedHeaders = getState().auth.headers
    }

    console.log('ApiMiddleware() - call ApiFetcher().fetch() cachedHeaders: ', cachedHeaders)

    if (cachedHeaders) {
      Object.keys(cachedHeaders).forEach(key => {
        opts.headers.append(key, cachedHeaders[key])
      })
    }

    return new Promise((resolve, reject) => {
      fetcher.fetch(url, opts)
        .then((response) => {
          console.log('ApiMiddleware().then() - response: ', response); 
          response.json().then(json => {
            console.log('ApiMiddleware().then() - json: ', json); 
            if (response.ok) {
              if (!payload.signOut) {
                const headers = extractHeadersToCache(headersToCache, response)
                console.log('ApiMiddleware().then() - headers: ', headers); 
                if (headers && Object.keys(headers).length) {
                  dispatch(newToken(headers))
                  localStorage.setItem(STORAGE_TOKEN_ID, JSON.stringify(headers))
                }
              }
              resolve(json)
            } else if (response.status === 401 && !payload.signIn && !payload.signOut) {
              dispatch(emailSignOut())
              reject('Your session has expired, please sign in again.')
            } else {
              reject(json)
            }
          })
        }).catch(function(error) {
          console.log('ApiMiddleware().catch() - error: ', error); 
          reject(error)
        })
    })
  }
)
