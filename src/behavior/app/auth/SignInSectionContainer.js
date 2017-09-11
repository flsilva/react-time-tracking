import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EmailSignInActions from './email/EmailSignInActions';
import SignInSection from '../../../ui/app/auth/SignInSection';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(EmailSignInActions, dispatch),
});

const SignInSectionContainer = (props) => {
  const { isFetching, error } = props.auth.emailSignIn;

  return (
    <div>
      <SignInSection
        email={props.location.query.email}
        error={props.auth.emailSignIn.error}
        isFetching={props.auth.emailSignIn.isFetching}
        submitHandler={props.actions.emailSignIn}
        user={props.auth.user}
      />
      <Notifications notifications={getNotifications(error, isFetching)} />
    </div>
  );
};

SignInSectionContainer.propTypes = {
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
)(SignInSectionContainer);
