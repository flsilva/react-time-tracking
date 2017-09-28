export const unauthorizedResponseHandler = (dispatch, action, message) => (
  (request, response, resolve, reject, next) => (
    () => {
      // eslint-disable-next-line no-console
      console.log('unauthorizedResponseHandler()');

      if (response.status !== 401) return next();
      if (request.isRecoveringSession || request.isSigningIn || request.isSigningOut) {
        return next();
      }

      dispatch(action());
      reject(message);
      return null;
    }
  )
);

export const addResponseTokenToState = (dispatch, action, extractHeaders) => (
  (request, response, resolve, reject, next) => (
    () => {
      // eslint-disable-next-line no-console
      console.log('addResponseTokenToState()');

      const method = request.opts.method;

      if (request.isSigningOut || response.status === 401 ||
         (method !== 'POST' && method !== 'PUT' && method !== 'PATCH' && !request.isRecoveringSession)) {
        return next();
      }

      const headers = extractHeaders(response.headers);
      if (headers && Object.keys(headers).length) {
        dispatch(action(headers));
      }

      return next();
    }
  )
);

export const addResponseTokenToLocalStorage = (extractHeaders, storageTokenId) => (
  (request, response, resolve, reject, next) => (
    () => {
      // eslint-disable-next-line no-console
      console.log('addResponseTokenToLocalStorage()');

      const method = request.opts.method;

      if (request.isSigningOut || response.status === 401 ||
         (method !== 'POST' && method !== 'PUT' && method !== 'PATCH' && !request.isRecoveringSession)) {
        return next();
      }

      const headers = extractHeaders(response.headers);
      if (headers && Object.keys(headers).length) {
        localStorage.setItem(storageTokenId, JSON.stringify(headers));
      }

      return next();
    }
  )
);

export const removeTokenFromLocalStorage = storageTokenId => (
  (request, response, resolve, reject, next) => (
    () => {
      // eslint-disable-next-line no-console
      console.log('removeTokenFromLocalStorage()');

      if (request.isSigningOut || response.status === 401) {
        localStorage.removeItem(storageTokenId);
      }

      return next();
    }
  )
);

export const returnJsonResponse = (request, response, resolve, reject, next) => (
  () => {
      // eslint-disable-next-line no-console
    console.log('returnJsonResponse()');

    if (!response) return next();

    response.json()
      .then((json) => {
        if (response && response.ok) {
          resolve(json);
        } else {
          reject(json);
        }
      })
      .catch(() => resolve());

    return null;
  }
);
