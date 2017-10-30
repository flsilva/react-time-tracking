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

const SimpleDatePicker = ({ date, name, onDatePick }) => (
  <DatePicker
    autoOk
    hintText="Pick a date"
    value={date}
    onChange={(e, value) => onDatePick(name, value)}
    formatDate={formatDate}
    textFieldStyle={{ width: 105 }}
    underlineStyle={{ display: 'none' }}
  />
);

SimpleDatePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  name: PropTypes.string,
  onDatePick: PropTypes.func.isRequired,
};

SimpleDatePicker.defaultProps = {
  date: new Date(),
  name: undefined,
};

export default SimpleDatePicker;
