import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from '../header/AppHeader';
import EmailSignInForm from './EmailSignInForm';

const bodyStyles = {
  margin: '20px',
};

const SignInSection = props => (
  <div className="SignInSection">
    <AppHeader title="Sign In" user={props.user} />
    <div style={bodyStyles}>
      <EmailSignInForm
        submitHandler={props.submitHandler}
        isFetching={props.isFetching}
        email={props.email}
      />
    </div>
  </div>
);

SignInSection.propTypes = {
  email: PropTypes.string,
  isFetching: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

SignInSection.defaultProps = {
  email: '',
  isFetching: false,
  user: null,
};

export default SignInSection;
