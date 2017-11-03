import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StopwatchActions from './StopwatchActions';
import { getElapsedTimeObject } from './StopwatchUtils';
import StopwatchTimeAndControls from '../../../ui/app/stopwatches/StopwatchTimeAndControls';

const StopwatchTimeAndControlsContainer = ({ actions, entity = {}, isConnecting }) => {
  const { activityTotalTime, id, isRunning, startedAt } = entity;

  const startStopwatch = () => {
    actions.startStopwatch(id);
  };

  const pauseStopwatch = () => {
    actions.pauseStopwatch({ id, activityTotalTime, startedAt });
  };

  const updateHours = (hours) => {
    actions.updateHours({ id, activityTotalTime, hours, startedAt });
  };

  const updateMinutes = (minutes) => {
    actions.updateMinutes({ id, activityTotalTime, minutes, startedAt });
  };

  return (
    <StopwatchTimeAndControls
      activityTotalTime={activityTotalTime}
      getElapsedTimeObject={getElapsedTimeObject}
      isConnecting={isConnecting}
      isRunning={isRunning}
      onHourPick={(attrName, value) => updateHours(value)}
      onMinutePick={(attrName, value) => updateMinutes(value)}
      pauseStopwatch={pauseStopwatch}
      startedAt={startedAt}
      startStopwatch={startStopwatch}
    />
  );
};

StopwatchTimeAndControlsContainer.propTypes = {
  actions: PropTypes.shape({
    updateHours: PropTypes.func.isRequired,
    updateMinutes: PropTypes.func.isRequired,
    pauseStopwatch: PropTypes.func.isRequired,
    startStopwatch: PropTypes.func.isRequired,
  }).isRequired,
  entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
  isConnecting: PropTypes.bool,
};

StopwatchTimeAndControlsContainer.defaultProps = {
  entity: undefined,
  isConnecting: false,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(StopwatchActions, dispatch),
});

export default connect(
  undefined,
  mapDispatchToProps,
)(StopwatchTimeAndControlsContainer);
