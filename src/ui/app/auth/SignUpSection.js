import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from '../header/AppHeader';
import EmailSignUpForm from './EmailSignUpForm';

const bodyStyles = {
  margin: '20px',
};

const SignUpSection = props => (
  <div className="SignUpSection">
    <AppHeader title="Sign Up" user={props.user} />
    <div style={bodyStyles}>
      <EmailSignUpForm
        submitHandler={props.submitHandler}
        isConnecting={props.isConnecting}
      />
    </div>
  </div>
);

SignUpSection.propTypes = {
  isConnecting: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

SignUpSection.defaultProps = {
  isConnecting: false,
  user: null,
};

export default SignUpSection;
