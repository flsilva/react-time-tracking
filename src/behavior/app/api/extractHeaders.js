export default (keys) => {
  return (headers) => {
    let _headers = {}
    let headerValue

    keys.forEach((headerKey) => {
      headerValue = headers.get(headerKey)

      if (headerValue) {
        _headers[headerKey] = headerValue
      }
    })

    return _headers
  }
}
