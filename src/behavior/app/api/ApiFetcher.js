class ApiFetcher {

  constructor (config) {
    this.config = config
  }
  
  fetch (request) {
    this.processRequestHandlers(this.config, request)

    return new Promise((resolve, reject) => {
      fetch(request.url, request.opts)
        .then(response => this.processSuccessHandlers(request, response, resolve, reject))
        .catch((error) => this.errorHandler(error, reject))
    })
  }

  processRequestHandlers = (config, request) => {
    let handler = this.requestHandler(config, request)

    if (this.config.requestHandlers) {
      let handlers = this.config.requestHandlers.slice()
      handlers.reverse()
      handlers.forEach((middleware) => {
        handler = middleware(config, request, handler)
      })
    }

    handler()
  }

  processSuccessHandlers = (request, response, resolve, reject) => {
    let handler = this.successHandler(request, response, resolve, reject)

    if (this.config.successResponseHandlers) {
      let handlers = this.config.successResponseHandlers.slice()
      handlers.reverse()
      handlers.forEach((middleware) => {
        handler = middleware(request, response, resolve, reject, handler)
      })
    }

    handler()
  }

  requestHandler = (config, request) => {
    return () => {
      console.log('ApiFetcher().requestHandler() - request: ', request)
    }
  }
  
  successHandler = (request, response, resolve, reject) => {
    return () => {
      console.log('ApiFetcher().successResponseHandler() - response: ', response)
      resolve(response)
    }
  }

  errorHandler = (error, reject) => {
    console.log('ApiFetcher().errorHandler() - error: ', error)
    reject(error)
  }
}

export default ApiFetcher
