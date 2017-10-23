import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import format from 'date-fns/format';
import isYesterday from 'date-fns/is_yesterday';
import isToday from 'date-fns/is_today';
import isTomorrow from 'date-fns/is_tomorrow';

const formatDate = (date) => {
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  if (isTomorrow(date)) return 'Tomorrow';

  return format(date, 'MMM Do');
};

const SimpleDatePicker = props => (
  <DatePicker
    autoOk
    hintText="Pick a date"
    value={props.date ? props.date : new Date()}
    onChange={(e, value) => props.onDatePick(value)}
    formatDate={formatDate}
    textFieldStyle={{ width: 105 }}
    underlineStyle={{ display: 'none' }}
  />
);

SimpleDatePicker.propTypes = {
  onDatePick: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date),
};

SimpleDatePicker.defaultProps = {
  date: new Date(),
};

export default SimpleDatePicker;
