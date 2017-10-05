import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StopwatchActions from './StopwatchActions';
import { getStopwatch } from './StopwatchReducers';
import StopwatchTimeAndControls from '../../../ui/app/stopwatch/StopwatchTimeAndControls';

const StopwatchTimeAndControlsContainer = props => (
  <StopwatchTimeAndControls
    activityTotalTime={props.activityTotalTime}
    isConnecting={props.isConnecting}
    isRunning={props.isRunning}
    onHourPick={props.actions.setStopwatchHours}
    onMinutePick={props.actions.setStopwatchMinutes}
    pauseStopwatch={props.actions.pauseStopwatch}
    startedAt={props.startedAt}
    startStopwatch={props.actions.startStopwatch}
  />
);

StopwatchTimeAndControlsContainer.propTypes = {
  actions: PropTypes.shape({
    setStopwatchHours: PropTypes.func.isRequired,
    setStopwatchMinutes: PropTypes.func.isRequired,
    pauseStopwatch: PropTypes.func.isRequired,
    startStopwatch: PropTypes.func.isRequired,
  }).isRequired,
  activityTotalTime: PropTypes.number,
  isConnecting: PropTypes.bool,
  isRunning: PropTypes.bool,
  startedAt: PropTypes.instanceOf(Date),
};

StopwatchTimeAndControlsContainer.defaultProps = {
  activityTotalTime: 0,
  isConnecting: false,
  isRunning: false,
  startedAt: null,
};

const mapStateToProps = (state) => {
  const stopwatch = getStopwatch(state) || {};
  const { activityTotalTime, isRunning, startedAt } = stopwatch;

  return {
    activityTotalTime,
    isRunning,
    startedAt,
    isConnecting: state.stopwatches.isConnecting,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(StopwatchActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StopwatchTimeAndControlsContainer);
