export const extractApiErrors = (error) => {
  if (!error) {
    return 'There was an error trying to connect to our servers, please try again.'
  }

  if (error.errors && error.errors.full_messages) {
    error = error.errors.full_messages
  } else if (error.errors) {
    error = error.errors
  } else if (error.error) {
    error = error.error
  }

  return error
}
