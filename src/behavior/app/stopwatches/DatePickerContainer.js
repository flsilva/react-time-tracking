import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StopwatchActions from './StopwatchActions';
import DatePicker from '../../../ui/app/common/DatePicker';

const DatePickerContainer = ({ actions, entity = {} }) => {
  const updateDate = (date) => {
    const { id } = entity;
    actions.updateDate({ id, date });
  };

  return (
    <DatePicker
      date={entity.activityDate || new Date()}
      onDatePick={(name, value) => updateDate(value)}
    />
  );
};

DatePickerContainer.propTypes = {
  actions: PropTypes.shape({
    updateDate: PropTypes.func.isRequired,
  }).isRequired,
  entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
};

DatePickerContainer.defaultProps = {
  entity: undefined,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(StopwatchActions, dispatch),
});

export default connect(
  undefined,
  mapDispatchToProps,
)(DatePickerContainer);
