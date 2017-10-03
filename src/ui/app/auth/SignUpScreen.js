import React from 'react';
import PropTypes from 'prop-types';
import SimpleAppBar from '../header/SimpleAppBar';
import EmailSignUpForm from './EmailSignUpForm';

const bodyStyles = {
  margin: '20px',
};

const SignUpScreen = props => (
  <div className="SignUpScreen">
    <SimpleAppBar title="Sign Up" />
    <div style={bodyStyles}>
      <EmailSignUpForm
        submitHandler={props.submitHandler}
        isConnecting={props.isConnecting}
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
