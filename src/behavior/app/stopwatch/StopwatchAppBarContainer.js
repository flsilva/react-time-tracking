import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StopwatchActions from './StopwatchActions';
import StopwatchAppBar from '../../../ui/app/stopwatch/StopwatchAppBar';

const StopwatchAppBarContainer = props => (
  <StopwatchAppBar resetStopwatch={props.actions.resetStopwatch} />
);

StopwatchAppBarContainer.propTypes = {
  actions: PropTypes.shape({
    resetStopwatch: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(StopwatchActions, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(StopwatchAppBarContainer);
