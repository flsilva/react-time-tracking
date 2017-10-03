export default keys => (
  (headers) => {
    const extractedHeaders = {};
    let headerValue;

    keys.forEach((headerKey) => {
      console.log(`extractHeaders() - headers.has(${headerKey}): `, headers.has(headerKey));
      if (headers.has(headerKey)) {
        extractedHeaders[headerKey] = headers.get(headerKey);
      }
    });

    return extractedHeaders;
  }
);
