import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';
import { formatPayloadToApi } from './JsonApiUtils';
import { httpRequestSucceeded } from './ApiActions';
import { formatApiError } from './ApiErrors';

const getHeaders = () => ({ 'Content-Type': 'application/vnd.api+json' });

const getFetcher = () => {
  const fetcher = axios.create({
    baseURL: 'http://192.168.0.4:3000/',
    crossDomain: true,
    timeout: 5000,
  });

  return fetcher;
};

const extractData = response => response.data;

const dispatchHttpRequestSucceeded = (dispatch, query) => (response) => {
  dispatch(httpRequestSucceeded({ response, query }));
  return response;
};

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

const addInterceptors = (dispatch, action, query, fetcher) => {
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
  fetcher.interceptors.response.use(
    dispatchHttpRequestSucceeded(dispatch, query),
  );
  fetcher.interceptors.response.use(undefined, formatApiErrorHandler);
};

const resourceToAxios = (resource) => {
  if (!resource) {
    throw new Error(`Argument <resource> must not be null. Received: ${resource}`);
  }

  const query = resource.query || {};
  const unitQuery = omit(query.unit, 'id') || {};
  const collectionQuery = query.collection || {};

  return {
    data: resource.payload,
    headers: resource.headers,
    method: resource.method,
    params: { ...unitQuery, ...collectionQuery },
    url: resource.url,
  };
};

// const makeRequest = fetcher => request => fetcher.request(request);

const makeRequest = (fetcher, dispatch, action) => (resource) => {
  if (!resource) {
    throw new Error(`Argument <resource> must not be null. Received: ${resource}`);
  }

  addInterceptors(dispatch, action, resource.query, fetcher);

  const axiosResource = resourceToAxios(resource);
  return fetcher.request(axiosResource);
};

// eslint-disable-next-line import/prefer-default-export
export const middleware = store => next => (action) => {
  // console.log('ApiModule().middleware() - action', action);

  if (!action.meta || !action.meta.http) return next(action);
  if (!action.meta.http.resource) return next(action);

  const newAction = cloneDeep(action);
  const { resource } = newAction.meta.http;

  const { auth } = newAction.meta;
  const token = (auth && auth.token) ? auth.token : undefined;
  resource.headers = {
    ...getHeaders(),
    ...token,
  };

  const fetcher = getFetcher();
  // addInterceptors(store.dispatch, action, fetcher);
  // newAction.meta.http.makeRequest = makeRequest(fetcher);
  newAction.meta.http.makeRequest = makeRequest(fetcher, store.dispatch, action);

  if (!resource.payload || !resource.payload.data) return next(newAction);

  const { relationships } = resource.payload.data;
  if (relationships) {
    resource.payload.data.relationships = Object.keys(relationships).reduce((acc, value) => {
      const rel = cloneDeep(relationships[value]);
      if (rel.data.id === 'AUTH_USER_ID') rel.data.id = newAction.meta.auth.user.id;
      acc[value] = rel;
      return acc;
    }, {});
  }

  resource.payload = formatPayloadToApi(resource.payload);

  return next(newAction);
};
