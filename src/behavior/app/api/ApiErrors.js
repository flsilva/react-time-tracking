// eslint-disable-next-line import/prefer-default-export
export const extractApiErrors = (error) => {
  if (!error) {
    return ['There was an error trying to connect to our servers, please try again.'];
  }

  let errors;

  if (error.errors && error.errors.full_messages) {
    errors = error.errors.full_messages;
  } else if (error.errors) {
    errors = error.errors;
  } else if (error.error) {
    errors = [error.error];
  }

  return errors;
};
