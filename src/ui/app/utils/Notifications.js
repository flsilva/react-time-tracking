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
  notifications && notifications.length ? notifications.map(error => error.detail).join('.\n') : ''
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
  notifications: PropTypes.arrayOf(PropTypes.shape({
    detail: PropTypes.string,
  })),
};

Notifications.defaultProps = {
  notifications: undefined,
};

export default Notifications;
