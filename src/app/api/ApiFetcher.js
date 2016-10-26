class ApiFetcher {
  fetch = (url, opts) => {
    opts = this.getOpts(opts)
    console.log('ApiFetcher().fetch() - opts: ', opts)

    return fetch(url, opts)
  }

  getHeaders = (headers) => {
    if (!headers) {
      headers = new Headers()
    }

    headers.append('Content-Type', 'application/json')
    return headers
  }

  getOpts = (opts) => {
    opts = Object.assign({}, opts, {
      headers: this.getHeaders(opts.headers),
      mode: 'cors'
    })

    return opts
  }

  post = (url, opts) => {
    opts = { method: 'POST', ...opts }
    return this.fetch(url, opts)
  }
}

export default ApiFetcher
