class ApiFetcher {

  constructor(requestPipe, responsePipe) {
    this.requestPipe = requestPipe;
    this.responsePipe = responsePipe;
  }

  fetch(request) {
    const newRequest = this.requestPipe(request);

    return new Promise((resolve, reject) => {
      fetch(newRequest.url, newRequest.opts)
        .then(response =>
          this.responsePipe({ request: newRequest, response, resolve, reject }),
        )
        .catch(error => this.errorHandler(error, reject));
    });
  }

  errorHandler = (error, reject) => {
    // eslint-disable-next-line no-console
    console.log('ApiFetcher().errorHandler() - error: ', error);
    reject(error);
  }
}

export default ApiFetcher;
