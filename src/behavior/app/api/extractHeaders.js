export default keys => (
  (headers) => {
    const extractedHeaders = {};
    let headerValue;

    keys.forEach((headerKey) => {
      headerValue = headers.get(headerKey);

      if (headerValue) {
        extractedHeaders[headerKey] = headerValue;
      }
    });

    return extractedHeaders;
  }
);
