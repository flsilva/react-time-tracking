import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

const joinNotifications = notifications => (
  notifications && notifications.length ? notifications.join(' ') : ''
);

const Notifications = ({ notifications }) => (
  <Snackbar
    autoHideDuration={4000}
    message={joinNotifications(notifications)}
    open={joinNotifications(notifications) !== ''}
  />
);

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.string),
};

Notifications.defaultProps = {
  notifications: null,
};

export default Notifications;
