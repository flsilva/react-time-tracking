import axios from 'axios';
import { observeStore } from './AppState';
import initAuth, {
  extractHttpAuthHeadersFromResponse,
  getAuthHeaders,
  unauthorizedHttpResponseHandler,
} from './auth';
import { getUser } from './auth/AuthState';

let store;

export default (_store) => {
  store = _store;
  initAuth(store, observeStore);
};

const getHeaders = () => ({
  ...getAuthHeaders(),
  'Content-Type': 'application/vnd.api+json',
});

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
    fetcher.interceptors.response.use(
      null,
      unauthorizedHttpResponseHandler(store.dispatch),
    );
  }
  /**/

  fetcher.interceptors.response.use(
    extractHttpAuthHeadersFromResponse(store.dispatch),
  );

  return fetcher;
};
