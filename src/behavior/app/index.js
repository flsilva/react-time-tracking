import { applyMiddleware } from 'redux';
import axios from 'axios';
import { observeStore } from './AppState';
import initAuth, {
  authMiddleware,
  extractAuthDataFromObject,
  getAuthHeaders,
  unauthorizedHandler,
} from './auth';
import { getUser } from './auth/AuthState';
import { apiMiddleware } from './api';
import { formatApiError } from './api/ApiErrors';

let store;

const getHeaders = () => ({
  ...getAuthHeaders(),
  'Content-Type': 'application/vnd.api+json',
});

const extractHttpAuthHeadersFromResponse = (response) => {
  extractAuthDataFromObject(store.dispatch, response.headers);
  return response;
};

const unauthorizedHttpHandler = (error) => {
  if (error.response.status !== 401) return Promise.reject(error);
  return Promise.reject(unauthorizedHandler(store.dispatch));
};

const formatApiErrorHandler = error => (
  Promise.reject(formatApiError(error.response.data))
);

export default (_store) => {
  store = _store;
  initAuth(store, observeStore);
};

export const getFetcher = () => {
  const fetcher = axios.create({
    baseURL: 'http://192.168.0.4:3000/',
    crossDomain: true,
    headers: getHeaders(),
    timeout: 5000,
  });

  /*
   * we don't want to run it when signing in
   * because API returns 401 for invalid credentials,
   * and we end up with a unauthorized error,
   * which is something we only want when users are signed in,
   * but their tokens have expired.
   */
  if (getUser(store.getState())) {
    fetcher.interceptors.response.use(null, unauthorizedHttpHandler);
  }
  /**/

  fetcher.interceptors.response.use(extractHttpAuthHeadersFromResponse);
  fetcher.interceptors.response.use(null, formatApiErrorHandler);

  return fetcher;
};

export const makeHttpRequest = request => getFetcher().request(request);

export const appMiddleware = applyMiddleware(authMiddleware, apiMiddleware);
