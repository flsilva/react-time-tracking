export const addApiPathToRequest = (config, request, next) => (
  () => {
    request.url = config.apiPath + request.path;
    next();
  }
);

export const addContentTypeJsonToRequest = (config, request, next) => (
  () => {
    if (!request.opts.headers) {
      request.opts.headers = new Headers();
    }

    request.opts.headers.append('Content-Type', 'application/json');
    next();
  }
);

export const addCorsModeToRequest = (config, request, next) => (
  () => {
    request.opts.mode = 'cors';
    next();
  }
);

export const addStateTokenToRequest = getState => (
  (config, request, next) => (
    () => {
      if (!request.opts.headers) {
        request.opts.headers = new Headers();
      }

      const tokenHeaders = getState().auth.token;
      if (!tokenHeaders) return next();

      Object.keys(tokenHeaders).forEach((key) => {
        request.opts.headers.append(key, tokenHeaders[key]);
      });

      return next();
    }
  )
);

export const addLocalStorageTokenToRequest = storageTokenId => (
  (config, request, next) => (
    () => {
      if (!request.opts.headers) {
        request.opts.headers = new Headers();
      }

      const tokenHeaders = JSON.parse(localStorage.getItem(storageTokenId));
      if (!tokenHeaders) return next();

      Object.keys(tokenHeaders).forEach((key) => {
        if (request.opts.headers.has(key)) return;
        request.opts.headers.append(key, tokenHeaders[key]);
      });

      return next();
    }
  )
);
