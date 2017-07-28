import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EmailSignInActions from './email/EmailSignInActions';
import LoginSection from '../../../ui/app/auth/LoginSection';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(EmailSignInActions, dispatch),
});

const LoginSectionContainer = props => (
  <LoginSection
    email={props.location.query.email}
    error={props.auth.emailSignIn.error}
    isFetching={props.auth.emailSignIn.isFetching}
    submitHandler={props.actions.emailSignIn}
    user={props.auth.user}
  />
);

LoginSectionContainer.propTypes = {
  actions: PropTypes.shape({
    emailSignIn: PropTypes.func.isRequired,
  }).isRequired,

  auth: PropTypes.shape({
    emailSignIn: PropTypes.shape({
      error: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
      isFetching: PropTypes.bool,
    }),
    user: PropTypes.object,
  }).isRequired,

  location: PropTypes.shape({
    query: PropTypes.shape({
      email: PropTypes.string,
    }),
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginSectionContainer);
