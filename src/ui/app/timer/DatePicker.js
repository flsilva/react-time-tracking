import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import FontIcon from 'material-ui/FontIcon';
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

const TimerDatePicker = props => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <FontIcon
      className="material-icons"
      style={{ color: '#3f2da5', marginRight: 20 }}
    >
      insert_invitation
    </FontIcon>
    <DatePicker
      autoOk
      hintText="Pick a date"
      value={props.date ? props.date : new Date()}
      onChange={(e, value) => props.datePicked(value)}
      formatDate={formatDate}
      textFieldStyle={{ width: 105 }}
      underlineStyle={{ display: 'none' }}
    />
  </div>
);

TimerDatePicker.propTypes = {
  datePicked: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date),
};

TimerDatePicker.defaultProps = {
  date: new Date(),
};

export default TimerDatePicker;
