import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StopwatchActions from './StopwatchActions';
import StopwatchAppBar from '../../presentation/stopwatches/StopwatchAppBar';

const StopwatchAppBarContainer = ({ actions, entityId }) => {
  const resetStopwatch = () => {
    actions.resetStopwatch(entityId);
  };

  return <StopwatchAppBar resetStopwatch={resetStopwatch} />;
};

StopwatchAppBarContainer.propTypes = {
  actions: PropTypes.shape({
    resetStopwatch: PropTypes.func.isRequired,
  }).isRequired,
  entityId: PropTypes.string,
};

StopwatchAppBarContainer.defaultProps = {
  entityId: undefined,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(StopwatchActions, dispatch),
});

export default connect(
  undefined,
  mapDispatchToProps,
)(StopwatchAppBarContainer);
