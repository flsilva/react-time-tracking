import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from '../header/AppHeader';
import EmailSignInForm from './EmailSignInForm';
import ErrorMessages from '../error/ErrorMessages';

const LoginSection = props => (
  <div className="LoginSection">
    <AppHeader title="Sign In" user={props.user} />
    <EmailSignInForm
      heading="Sign In"
      submitHandler={props.submitHandler}
      isFetching={props.isFetching}
      email={props.email}
    />
    <ErrorMessages error={props.error} />
  </div>
);

LoginSection.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  email: PropTypes.string,
  isFetching: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

LoginSection.defaultProps = {
  email: '',
  isFetching: false,
  error: null,
  user: null,
};

export default LoginSection;
