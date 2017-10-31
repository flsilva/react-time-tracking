import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import * as EmailSignInActions from './email/EmailSignInActions';
import SignInScreen from '../../../ui/app/auth/SignInScreen';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

const SignInScreenContainer = (props) => {
  const { isConnecting, error } = props.auth.emailSignIn;
  const email = parse(props.location.search).email;

  return (
    <div>
      <SignInScreen
        email={email}
        error={props.auth.emailSignIn.error}
        isConnecting={props.auth.emailSignIn.isConnecting}
        submitHandler={props.actions.emailSignIn}
        user={props.auth.user}
      />
      <Notifications notifications={getNotifications(error, isConnecting)} />
    </div>
  );
};

SignInScreenContainer.propTypes = {
  actions: PropTypes.shape({
    emailSignIn: PropTypes.func.isRequired,
  }).isRequired,

  auth: PropTypes.shape({
    emailSignIn: PropTypes.shape({
      error: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
      isConnecting: PropTypes.bool,
    }),
    user: PropTypes.object,
  }).isRequired,

  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(EmailSignInActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInScreenContainer);
