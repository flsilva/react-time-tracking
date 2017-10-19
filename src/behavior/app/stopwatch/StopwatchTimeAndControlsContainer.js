import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StopwatchActions from './StopwatchActions';
import { getStopwatch } from './StopwatchState';
import { getElapsedTimeObject } from './StopwatchUtils';
import StopwatchTimeAndControls from '../../../ui/app/stopwatch/StopwatchTimeAndControls';

const StopwatchTimeAndControlsContainer = (props) => {
  const startStopwatch = () => {
    props.actions.startStopwatch(props.id);
  };

  const pauseStopwatch = () => {
    const { id, activityTotalTime, startedAt } = props;
    props.actions.pauseStopwatch({ id, activityTotalTime, startedAt });
  };

  const setStopwatchHours = (hours) => {
    const { id, activityTotalTime } = props;
    props.actions.setStopwatchHours({ id, activityTotalTime, hours });
  };

  const setStopwatchMinutes = (minutes) => {
    const { id, activityTotalTime } = props;
    props.actions.setStopwatchMinutes({ id, activityTotalTime, minutes });
  };

  return (
    <StopwatchTimeAndControls
      activityTotalTime={props.activityTotalTime}
      getElapsedTimeObject={getElapsedTimeObject}
      isConnecting={props.isConnecting}
      isRunning={props.isRunning}
      onHourPick={setStopwatchHours}
      onMinutePick={setStopwatchMinutes}
      pauseStopwatch={pauseStopwatch}
      startedAt={props.startedAt}
      startStopwatch={startStopwatch}
    />
  );
};

StopwatchTimeAndControlsContainer.propTypes = {
  actions: PropTypes.shape({
    setStopwatchHours: PropTypes.func.isRequired,
    setStopwatchMinutes: PropTypes.func.isRequired,
    pauseStopwatch: PropTypes.func.isRequired,
    startStopwatch: PropTypes.func.isRequired,
  }).isRequired,
  activityTotalTime: PropTypes.number,
  id: PropTypes.string,
  isConnecting: PropTypes.bool,
  isRunning: PropTypes.bool,
  startedAt: PropTypes.instanceOf(Date),
};

StopwatchTimeAndControlsContainer.defaultProps = {
  activityTotalTime: 0,
  id: null,
  isConnecting: false,
  isRunning: false,
  startedAt: null,
};

const mapStateToProps = (state) => {
  const stopwatch = getStopwatch(state) || {};
  const { activityTotalTime, id, isRunning, startedAt } = stopwatch;

  return {
    activityTotalTime,
    id,
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
