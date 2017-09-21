import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from '../header/AppHeader';

const TimerScreen = props => (
  <div className="TimerScreen">
    <AppHeader title="Timer" user={props.user} />
    <p>
      Timer section
    </p>
  </div>
);

TimerScreen.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

TimerScreen.defaultProps = {
  user: null,
};

export default TimerScreen;
