import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StopwatchActions from './StopwatchActions';
import { getStopwatch } from './StopwatchState';
import DatePicker from '../../../ui/app/stopwatch/DatePicker';

const DatePickerContainer = (props) => {
  const setActivityDate = (date) => {
    const { id } = props;
    props.actions.setActivityDate({ id, date });
  };

  return (
    <DatePicker
      date={props.activityDate}
      onDatePick={setActivityDate}
    />
  );
};

DatePickerContainer.propTypes = {
  actions: PropTypes.shape({
    setActivityDate: PropTypes.func.isRequired,
  }).isRequired,
  activityDate: PropTypes.instanceOf(Date),
  id: PropTypes.string,
};

DatePickerContainer.defaultProps = {
  activityDate: null,
  id: null,
};

const mapStateToProps = (state) => {
  const stopwatch = getStopwatch(state) || {};
  const { activityDate, id } = stopwatch;

  return { activityDate, id };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(StopwatchActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DatePickerContainer);
