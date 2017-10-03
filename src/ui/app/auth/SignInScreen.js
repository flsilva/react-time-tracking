import React from 'react';
import PropTypes from 'prop-types';
import SimpleAppBar from '../header/SimpleAppBar';
import EmailSignInForm from './EmailSignInForm';

const bodyStyles = {
  margin: '20px',
};

const SignInScreen = props => (
  <div className="SignInScreen">
    <SimpleAppBar title="Sign In" />
    <div style={bodyStyles}>
      <EmailSignInForm
        submitHandler={props.submitHandler}
        isConnecting={props.isConnecting}
        email={props.email}
      />
    </div>
  </div>
);

SignInScreen.propTypes = {
  email: PropTypes.string,
  isConnecting: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

SignInScreen.defaultProps = {
  email: '',
  isConnecting: false,
  user: null,
};

export default SignInScreen;
