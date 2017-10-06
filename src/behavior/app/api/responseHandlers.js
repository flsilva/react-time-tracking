export const removeTokenFromLocalStorage = storageTokenId => (
  ({ request, response, resolve, reject }) => {
    // eslint-disable-next-line no-console
    console.log('removeTokenFromLocalStorage()');

    if (request.isSigningOut || response.status === 401) {
      localStorage.removeItem(storageTokenId);
    }

    return { request, response, resolve, reject };
  }
);

export const unauthorizedResponseHandler = (dispatch, action, message) => (
  ({ request, response, resolve, reject }) => {
    // eslint-disable-next-line no-console
    console.log('unauthorizedResponseHandler()');

    if (response.status !== 401) return { request, response, resolve, reject };
    if (request.isRecoveringSession || request.isSigningIn || request.isSigningOut) {
      return { request, response, resolve, reject };
    }

    dispatch(action());
    reject(message);
    return null;
  }
);

export const addResponseTokenToState = (dispatch, action, extractHeaders) => (
  ({ request, response, resolve, reject }) => {
    // eslint-disable-next-line no-console
    console.log('addResponseTokenToState()');

    if (request.isSigningOut || response.status === 401) {
      return { request, response, resolve, reject };
    }

    const headers = extractHeaders(response.headers);
    if (headers && Object.keys(headers).length) {
      dispatch(action(headers));
    }

    return { request, response, resolve, reject };
  }
);

export const addResponseTokenToLocalStorage = (extractHeaders, storageTokenId) => (
  ({ request, response, resolve, reject }) => {
    // eslint-disable-next-line no-console
    console.log('addResponseTokenToLocalStorage()');

    if (request.isSigningOut || response.status === 401) {
      return { request, response, resolve, reject };
    }

    const headers = extractHeaders(response.headers);
    if (headers && Object.keys(headers).length) {
      localStorage.setItem(storageTokenId, JSON.stringify(headers));
    }

    return { request, response, resolve, reject };
  }
);

export const returnJsonResponse = ({ request, response, resolve, reject }) => {
  // eslint-disable-next-line no-console
  console.log('returnJsonResponse()');

  if (!response) return { request, response, resolve, reject };
  let newResponse;

  response.json()
    .then((json) => {
      newResponse = json;
      if (response && response.ok) {
        resolve(json);
      } else {
        reject(json);
      }
    })
    .catch(() => resolve());

  return { request, response: newResponse, resolve, reject };
};
