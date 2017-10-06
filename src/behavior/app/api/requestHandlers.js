import merge from 'lodash/merge';

export const addApiPathToRequest = apiPath => request => ({
  ...request,
  ...{
    url: apiPath + request.path,
  },
});

export const addContentTypeJsonToRequest = (request) => {
  const newRequest = { ...request };

  if (!newRequest.opts.headers) {
    newRequest.opts.headers = new Headers();
  }

  newRequest.opts.headers.append('Content-Type', 'application/vnd.api+json');
  return newRequest;
};

export const addCorsModeToRequest = request => (
  merge({ ...request }, { opts: { mode: 'cors' } })
);

export const addTokenToRequest = tokenObj => (request) => {
  if (!tokenObj) return request;

  const newRequest = { ...request };

  if (!newRequest.opts.headers) {
    newRequest.opts.headers = new Headers();
  }

  return Object.keys(tokenObj).reduce((finalRequest, key) => {
    finalRequest.opts.headers.append(key, tokenObj[key]);
    return finalRequest;
  }, newRequest);
};
