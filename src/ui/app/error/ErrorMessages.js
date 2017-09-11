import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

const joinNotifications = notifications => (
  notifications && notifications.length ? notifications.join(' ') : ''
);

const ErrorMessages = props => (
  <Snackbar
    autoHideDuration={4000}
    message={joinNotifications(props.notifications)}
    open={joinNotifications(props.notifications) !== ''}
  />
);

ErrorMessages.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.string),
};

ErrorMessages.defaultProps = {
  notifications: null,
};

export default ErrorMessages;
