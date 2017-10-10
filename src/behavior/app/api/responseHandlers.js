export const extractHeadersFromResponse = (dispatch, action, extractHeaders) => (
  (response) => {
    const headers = extractHeaders(response.headers);
    if (headers && Object.keys(headers).length) {
      dispatch(action(headers));
    }

    return response;
  }
);

export const unauthorizedResponseHandler = (dispatch, action, message) => (
  (error) => {
    if (error.response.status !== 401) return Promise.reject(error);
    dispatch(action());
    return Promise.reject(message);
  }
);
