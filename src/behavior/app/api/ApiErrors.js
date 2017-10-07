import isString from 'lodash/isString';

// eslint-disable-next-line import/prefer-default-export
export const extractApiErrors = (error) => {
  if (!error) {
    return [{ detail: 'There was an error trying to connect to our servers, please try again.' }];
  }

  let errors;

  if (isString(error)) {
    errors = [{ detail: error }];
  } else if (error.errors && error.errors.full_messages) {
    errors = error.errors.full_messages;
  } else if (error.errors) {
    errors = error.errors.map(someError => (
      isString(someError) ? { detail: someError } : someError
    ));
  } else if (error.error) {
    errors = [{ detail: error.error }];
  }

  return errors;
};
