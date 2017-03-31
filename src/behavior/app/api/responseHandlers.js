export const unauthorizedResponseHandler = (dispatch, action, message) => {
  return (request, response, resolve, reject, next) => {
    return () => {
      console.log('unauthorizedResponseHandler()')
      if (response.status !== 401) return next()
      if (request.isRecoveringSession || request.isSigningIn || request.isSigningOut) return next()

      dispatch(action())
      reject(message)
    }
  }
}

export const addResponseTokenToState = (dispatch, action, extractHeaders) => {
  return (request, response, resolve, reject, next) => {
    return () => {
      console.log('addResponseTokenToState()')
      if (request.isSigningOut || response.status === 401) {
        return next()
      }

      const headers = extractHeaders(response.headers)
      if (headers && Object.keys(headers).length) {
        dispatch(action(headers))
      }

      next()
    }
  }
}

export const addResponseTokenToLocalStorage = (extractHeaders, storageTokenId) => {
  return (request, response, resolve, reject, next) => {
    return () => {
      console.log('addResponseTokenToLocalStorage()')
      if (request.isSigningOut || response.status === 401) {
        return next()
      }

      const headers = extractHeaders(response.headers)
      if (headers && Object.keys(headers).length) {
        localStorage.setItem(storageTokenId, JSON.stringify(headers))
      }

      next()
    }
  }
}

export const removeTokenFromLocalStorage = (storageTokenId) => {
  return (request, response, resolve, reject, next) => {
    return () => {
      console.log('removeTokenFromLocalStorage() - request: ', request)
      if (request.isSigningOut || response.status === 401) {
        localStorage.removeItem(storageTokenId)
      }

      next()
    }
  }
}

export const returnJsonResponse = (request, response, resolve, reject, next) => {
  return () => {
    console.log('returnJsonResponse()')
    if (!response) return next()

    response.json()
      .then(json => {
        if (response && response.ok) {
          resolve(json)
        } else {
          reject(json)
        }
      })
  }
}
