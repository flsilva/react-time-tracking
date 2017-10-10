import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StopwatchActions from './StopwatchActions';
import { getStopwatch } from './StopwatchState';
import DatePicker from '../../../ui/app/stopwatch/DatePicker';

const DatePickerContainer = props => (
  <DatePicker
    date={props.activityDate}
    onDatePick={props.actions.setActivityDate}
  />
);

DatePickerContainer.propTypes = {
  actions: PropTypes.shape({
    setActivityDate: PropTypes.func.isRequired,
  }).isRequired,
  activityDate: PropTypes.instanceOf(Date),
};

DatePickerContainer.defaultProps = {
  activityDate: null,
};

const mapStateToProps = (state) => {
  const stopwatch = getStopwatch(state) || {};
  const { activityDate } = stopwatch;

  return { activityDate };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(StopwatchActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DatePickerContainer);
