import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

const styles = {
  fontWeight: 300,
  height: 'auto',
  lineHeight: '28px',
  maxHeight: '150px',
  padding: 24,
  whiteSpace: 'pre-line',
};

const joinNotifications = notifications => (
  notifications && notifications.length ? notifications.join('.\n') : ''
);

const Notifications = ({ notifications }) => (
  <Snackbar
    autoHideDuration={5000}
    bodyStyle={styles}
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
