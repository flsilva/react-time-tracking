import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pauseStopwatch, resetStopwatch, setActivityDescription } from './StopwatchActions';
import { getStopwatch } from './StopwatchState';
import StopwatchFormButtons from '../../../ui/app/stopwatch/StopwatchFormButtons';

const StopwatchFormButtonsContainer = (props, { router }) => {
  const { actions, entity, isConnecting } = props;

  const onSaveClick = () => {
    const {
      activityDate,
      activityTotalTime,
      description,
      id,
      project,
      startedAt,
    } = entity;

    const timeLogValues = {
      description,
      logDate: activityDate,
      loggedTime: activityTotalTime,
      project,
    };

    if (startedAt) actions.pauseStopwatch({ activityTotalTime, id, startedAt });
    actions.resetStopwatch(id);
    router.history.push({
      pathname: '/app/time-logs/new',
      state: timeLogValues,
    });
  };

  return (
    <StopwatchFormButtons
      isConnecting={isConnecting}
      onSaveClick={onSaveClick}
    />
  );
};

StopwatchFormButtonsContainer.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

StopwatchFormButtonsContainer.propTypes = {
  actions: PropTypes.shape({
    pauseStopwatch: PropTypes.func.isRequired,
    setActivityDescription: PropTypes.func.isRequired,
  }).isRequired,

  entity: PropTypes.shape({
    description: PropTypes.string,
  }),

  isConnecting: PropTypes.bool,
};

StopwatchFormButtonsContainer.defaultProps = {
  entity: undefined,
  isConnecting: false,
};

const mapStateToProps = state => ({
  entity: getStopwatch(state) || undefined,
  isConnecting: state.stopwatches.isConnecting,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators({
      pauseStopwatch,
      resetStopwatch,
      setActivityDescription,
    }, dispatch),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StopwatchFormButtonsContainer);
