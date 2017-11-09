import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import { addRelationshipToPayload, formatPayloadToApi } from './JsonApiUtils';
import { formatApiError } from './ApiErrors';

const getHeaders = () => ({ 'Content-Type': 'application/vnd.api+json' });

const getFetcher = () => {
  const fetcher = axios.create({
    baseURL: 'http://192.168.0.3:3000/',
    crossDomain: true,
    timeout: 5000,
  });

  return fetcher;
};

const extractData = response => response.data;

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

const addInterceptors = (dispatch, action, fetcher) => {
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
  fetcher.interceptors.response.use(undefined, formatApiErrorHandler);
};

const makeRequest = fetcher => request => fetcher.request(request);

// eslint-disable-next-line import/prefer-default-export
export const middleware = store => next => (action) => {
  // console.log('ApiModule().middleware() - action', action);

  if (!action.meta || !action.meta.http) return next(action);
  if (!action.meta.http.request) return next(action);

  const newAction = cloneDeep(action);
  const { entity, request } = newAction.meta.http;

  const { auth } = newAction.meta;
  const token = (auth && auth.token) ? auth.token : undefined;
  request.headers = {
    ...getHeaders(),
    ...token,
  };

  const fetcher = getFetcher();
  addInterceptors(store.dispatch, action, fetcher);
  newAction.meta.http.makeRequest = makeRequest(fetcher);

  if (!entity || !request.data) return next(newAction);

  request.data = formatPayloadToApi(entity.type, request.data);

  const { relationships } = entity;
  if (relationships) {
    request.data = relationships.reduce((data, rel) => {
      const { user } = newAction.meta.auth;
      const id = rel.id === 'AUTH_USER_ID' ? user.id : rel.id;
      return addRelationshipToPayload(data, rel.attrName, rel.type, id);
    }, request.data);
  }

  return next(newAction);
};
