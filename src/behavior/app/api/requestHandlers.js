export const addApiPathToRequest = (config, request, next) => {
  return () => {
    request.url = config.apiPath + request.path
    next()
  }
}

export const addContentTypeJsonToRequest = (config, request, next) => {
  return () => {
    if (!request.opts.headers) {
      request.opts.headers = new Headers()
    }

    request.opts.headers.append('Content-Type', 'application/json')
    next()
  }
}

export const addCorsModeToRequest = (config, request, next) => {
  return () => {
    request.opts.mode = 'cors'
    next()
  }
}

export const addStateTokenToRequest = (getState) => {
  return (config, request, next) => {
    return () => {
      if (!request.opts.headers) {
        request.opts.headers = new Headers()
      }
    
      const tokenHeaders = getState().auth.token
      if (!tokenHeaders) return next()

      Object.keys(tokenHeaders).forEach(key => {
        request.opts.headers.append(key, tokenHeaders[key])
      })

      next()
    }
  }
}

export const addLocalStorageTokenToRequest = (storageTokenId) => {
  return (config, request, next) => {
    return () => {
      if (!request.opts.headers) {
        request.opts.headers = new Headers()
      }
      
      const tokenHeaders = JSON.parse(localStorage.getItem(storageTokenId))
      if (!tokenHeaders) return next()

      Object.keys(tokenHeaders).forEach(key => {
        if (request.opts.headers.has(key)) return
        request.opts.headers.append(key, tokenHeaders[key])
      })

      next()
    }
  }
}
