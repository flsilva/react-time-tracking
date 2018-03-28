import React from 'react';
import PropTypes from 'prop-types';
import SimpleAppBar from '../header/SimpleAppBar';
import EmailSignInForm from './EmailSignInForm';

const bodyStyles = {
  margin: '20px',
};

const SignInScreen = ({ email, isConnecting, submitHandler }) => (
  <div>
    <SimpleAppBar title="Sign In" />
    <div style={bodyStyles}>
      <EmailSignInForm
        email={email}
        isConnecting={isConnecting}
        submitHandler={submitHandler}
      />
    </div>
  </div>
);

SignInScreen.propTypes = {
  email: PropTypes.string,
  isConnecting: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
};

SignInScreen.defaultProps = {
  email: '',
  isConnecting: false,
};

export default SignInScreen;
