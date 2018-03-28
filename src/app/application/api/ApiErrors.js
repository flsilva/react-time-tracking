import isString from 'lodash/isString';

const DEFAULT_ERROR_MESSAGE = 'There was an error trying to connect to our servers, please try again.';

// eslint-disable-next-line import/prefer-default-export
export const formatApiError = (error) => {
  if (!error) {
    return [{ detail: DEFAULT_ERROR_MESSAGE }];
  }

  let errors;

  if (isString(error)) {
    errors = [{ detail: error }];
  } else if (error instanceof Error) {
    errors = [{ detail: error.message }];
  } else if (error.errors && error.errors.full_messages) {
    errors = error.errors.full_messages.map(detail => ({ detail }));
  } else if (error.errors) {
    errors = error.errors.map(someError => (
      isString(someError) ? { detail: someError } : someError
    ));
  } else if (error.error) {
    errors = [{ detail: error.error }];
  }

  return errors;
};
