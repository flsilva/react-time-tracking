import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import FontIcon from 'material-ui/FontIcon';
import format from 'date-fns/format';
import isYesterday from 'date-fns/is_yesterday';
import isToday from 'date-fns/is_today';
import isTomorrow from 'date-fns/is_tomorrow';
import IconFieldWrap from '../common/IconFieldWrap';

const formatDate = (date) => {
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  if (isTomorrow(date)) return 'Tomorrow';

  return format(date, 'MMM Do');
};

const Icon = (
  <FontIcon
    className="material-icons"
    style={{ color: '#3f2da5' }}
  >
    insert_invitation
  </FontIcon>
);

const StopwatchDatePicker = props => (
  <IconFieldWrap icon={Icon}>
    <DatePicker
      autoOk
      hintText="Pick a date"
      value={props.date ? props.date : new Date()}
      onChange={(e, value) => props.onDatePick(value)}
      formatDate={formatDate}
      textFieldStyle={{ width: 105 }}
      underlineStyle={{ display: 'none' }}
    />
  </IconFieldWrap>
);

StopwatchDatePicker.propTypes = {
  onDatePick: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date),
};

StopwatchDatePicker.defaultProps = {
  date: new Date(),
};

export default StopwatchDatePicker;
