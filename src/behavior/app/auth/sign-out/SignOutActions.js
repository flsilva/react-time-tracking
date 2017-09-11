import { getFetcher } from '../../api/ApiConfig';
import { extractApiErrors } from '../../api/ApiErrors';

export const SIGN_OUT_START = 'SIGN_OUT_START';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR';

const signOutStart = () => ({ type: SIGN_OUT_START });
export const signOutSuccess = payload => ({ type: SIGN_OUT_SUCCESS, payload });
const signOutError = payload => ({ type: SIGN_OUT_ERROR, payload });

export const signOut = () => (
  (dispatch) => {
    // eslint-disable-next-line no-console
    console.log('SignOutActions::signOut()');

    dispatch(signOutStart());

    const errorHandler = (error) => {
    // eslint-disable-next-line no-console
      console.log('SignOutActions::signOut().errorHandler() - error: ', error);

      // we can remotely log errors,
      // but give OK feedback for end users,
      // no need to show errors.
      const errors = extractApiErrors(error);
      dispatch(signOutError(errors));
      dispatch(signOutSuccess({}));
      return {};
    };

    const successHandler = (json) => {
    // eslint-disable-next-line no-console
      console.log('SignOutActions::signOut().successHandler() - json: ', json);
      dispatch(signOutSuccess(json.data));
      return json.data;
    };

    const opts = {
      method: 'DELETE',
    };

    const payload = {
      opts,
      path: 'auth/sign_out',
      isSigningOut: true,
    };

    return getFetcher().fetch(payload).then(successHandler).catch(errorHandler);
  }
);
