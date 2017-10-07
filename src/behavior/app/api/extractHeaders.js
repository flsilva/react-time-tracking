export default keys => headers => (
  keys.filter(headerKey => Object.prototype.hasOwnProperty.call(headers, headerKey))
    .reduce((extractedHeaders, headerKey) => ({
      ...extractedHeaders,
      ...{ [headerKey]: headers[headerKey] },
    }), {})
);
