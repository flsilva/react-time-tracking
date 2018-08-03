import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';
import { dasherizePayloadToApi } from './requests/Utils';
// import { updateResourceDatabase } from './resources/Services';
// import { httpRequestSucceeded } from './Services';
import { formatApiError } from './Errors';

export * from './requests';
export * from './responses';
export * from './Repository';
export * from './SideEffects';

const getHeaders = () => ({ 'Content-Type': 'application/vnd.api+json' });

const getFetcher = () => {
  const fetcher = axios.create({
    baseURL: 'http://192.168.0.7:3000/',
    crossDomain: true,
    timeout: 5000,
  });

  return fetcher;
};

// const extractData = response => response.data;
const extractData = (response) => {
  console.log('extractData - response: ', response);
  return response.data;
};

/*
const dispatchHttpRequestSucceeded = (dispatch, request) => (response) => {
  dispatch(httpRequestSucceeded({ request, response }));
  if (!request.ignoreResponse) dispatch(updateResourceDatabase({ request, response }));
  return response;
};
*/

const extractHttpAuthHeadersFromResponse = (dispatch, extractAuthDataFromObject) => (response) => {
  extractAuthDataFromObject(dispatch, response.headers);
  return response;
};

const formatApiErrorHandler = error => (
  Promise.reject(formatApiError(error.response.data))
);

const unauthorizedHttpHandler = (dispatch, unauthorizedHandler) => (error) => {
  if (error.response.status !== 401) return Promise.reject(error);
  return Promise.reject(unauthorizedHandler(dispatch));
};

const addInterceptors = (dispatch, action, request, fetcher) => {
  const auth = action.meta.auth || {};
  const { extractAuthDataFromObject, unauthorizedHandler } = auth;

  if (unauthorizedHandler) {
    fetcher.interceptors.response.use(
      undefined,
      unauthorizedHttpHandler(dispatch, unauthorizedHandler),
    );
  }

  if (extractAuthDataFromObject) {
    fetcher.interceptors.response.use(
      extractHttpAuthHeadersFromResponse(dispatch, extractAuthDataFromObject),
    );
  }

  fetcher.interceptors.response.use(extractData, undefined);
  /*
  fetcher.interceptors.response.use(
    dispatchHttpRequestSucceeded(dispatch, request),
  );
  */
  fetcher.interceptors.response.use(undefined, formatApiErrorHandler);
};

const requestToAxios = (request) => {
  if (!request) {
    throw new Error(`Argument <request> must not be null. Received: ${request}`);
  }

  const query = request.query || {};
  const unitQuery = omit(query.unit, 'id') || {};
  const collectionQuery = query.collection || {};

  const { headers, method, payload, url } = request;

  return {
    data: payload,
    headers,
    method,
    params: { ...unitQuery, ...collectionQuery },
    url,
  };
};

// const makeRequest = fetcher => request => fetcher.request(request);

const makeRequest = (fetcher, dispatch, action) => (request) => {
  console.log('makeRequest() - request: ', request);
  if (!request) {
    throw new Error(`Argument <request> must not be null. Received: ${request}`);
  }

  addInterceptors(dispatch, action, request, fetcher);

  const axiosRequest = requestToAxios(request);
  return fetcher.request(axiosRequest);
};

// eslint-disable-next-line import/prefer-default-export
export const middleware = store => next => (action) => {
  console.log('ApiModule().middleware() - action', action);

  if (!action.meta || !action.meta.http) return next(action);
  if (!action.meta.http.request) return next(action);

  const newAction = cloneDeep(action);
  const { request } = newAction.meta.http;

  const { auth } = newAction.meta;
  const token = (auth && auth.token) ? auth.token : undefined;
  request.headers = {
    ...getHeaders(),
    ...token,
  };

  const fetcher = getFetcher();
  // addInterceptors(store.dispatch, action, fetcher);
  // newAction.meta.http.makeRequest = makeRequest(fetcher);
  newAction.meta.http.makeRequest = makeRequest(fetcher, store.dispatch, action);

  console.log('ApiModule().middleware() - PASSOU - newAction', newAction);
  if (!request.payload || !request.payload.data) return next(newAction);

  const { relationships } = request.payload.data;
  if (relationships) {
    request.payload.data.relationships = Object.keys(relationships).reduce((acc, value) => {
      const rel = cloneDeep(relationships[value]);
      if (rel.data.id === 'AUTH_USER_ID') rel.data.id = newAction.meta.auth.user.id;
      acc[value] = rel;
      return acc;
    }, {});
  }

  request.payload = dasherizePayloadToApi(request.payload);

  return next(newAction);
};
