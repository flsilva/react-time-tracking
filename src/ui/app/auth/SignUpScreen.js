import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from '../header/AppHeader';
import EmailSignUpForm from './EmailSignUpForm';

const bodyStyles = {
  margin: '20px',
};

const SignUpScreen = props => (
  <div className="SignUpScreen">
    <AppHeader title="Sign Up" user={props.user} />
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
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

SignUpScreen.defaultProps = {
  isConnecting: false,
  user: null,
};

export default SignUpScreen;
