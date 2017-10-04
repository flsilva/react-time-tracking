export default keys => headers => (
  keys.filter(headerKey => headers.has(headerKey))
    .reduce((extractedHeaders, headerKey) => ({
      ...extractedHeaders,
      ...{ [headerKey]: headers.get(headerKey) },
    }), {})
);
