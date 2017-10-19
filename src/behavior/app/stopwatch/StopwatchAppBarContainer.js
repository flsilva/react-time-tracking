import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StopwatchActions from './StopwatchActions';
import { getStopwatch } from './StopwatchState';
import StopwatchAppBar from '../../../ui/app/stopwatch/StopwatchAppBar';

const StopwatchAppBarContainer = (props) => {
  const resetStopwatch = () => {
    props.actions.resetStopwatch(props.id);
  };

  return <StopwatchAppBar resetStopwatch={resetStopwatch} />;
};

StopwatchAppBarContainer.propTypes = {
  actions: PropTypes.shape({
    resetStopwatch: PropTypes.func.isRequired,
  }).isRequired,
  id: PropTypes.string,
};

StopwatchAppBarContainer.defaultProps = {
  id: null,
};

const mapStateToProps = (state) => {
  const stopwatch = getStopwatch(state) || {};
  const { id } = stopwatch;

  return { id };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(StopwatchActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StopwatchAppBarContainer);
