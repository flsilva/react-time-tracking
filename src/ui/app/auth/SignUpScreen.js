import React from 'react';
import PropTypes from 'prop-types';
import SimpleAppBar from '../header/SimpleAppBar';
import EmailSignUpForm from './EmailSignUpForm';

const bodyStyles = {
  margin: '20px',
};

const SignUpScreen = ({ isConnecting, submitHandler }) => (
  <div>
    <SimpleAppBar title="Sign Up" />
    <div style={bodyStyles}>
      <EmailSignUpForm
        isConnecting={isConnecting}
        submitHandler={submitHandler}
      />
    </div>
  </div>
);

SignUpScreen.propTypes = {
  isConnecting: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
};

SignUpScreen.defaultProps = {
  isConnecting: false,
};

export default SignUpScreen;
