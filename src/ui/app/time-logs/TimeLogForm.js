import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import CalendarIcon from 'material-ui/svg-icons/action/event';
import WorkIcon from 'material-ui/svg-icons/action/work';
import SheetIcon from 'material-ui/svg-icons/action/description';
import WithIcon from '../common/WithIcon';
import DatePicker from '../common/DatePicker';
import NumberDropDown from '../common/NumberDropDown';

const styles = {
  body: {
    margin: '20px',
  },
  timeContainer: {
    alignItems: 'baseline',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0px 35px',
  },
};

const TimeLogForm = (props, context) => {
  const { onCustomInputChange, onInputChange, values } = props;
  const timeBgColor = context.muiTheme.palette.primary1Color;
  const ProjectDropDown = props.projectDropDownClass;

  return (
    <div>
      <div style={{ ...styles.timeContainer, ...{ backgroundColor: timeBgColor } }}>
        <NumberDropDown
          name="hours"
          prependZero
          maxHeight={300}
          onChange={onCustomInputChange}
          startNum={0}
          endNum={24}
          value={values.hours}
        />
        <NumberDropDown
          name="minutes"
          prependZero
          maxHeight={300}
          onChange={onCustomInputChange}
          startNum={0}
          endNum={59}
          value={values.minutes}
        />
      </div>
      <div style={styles.body}>
        <WithIcon icon={<CalendarIcon color={'#3f2da5'} />}>
          <DatePicker
            name="date"
            date={values.date}
            onDatePick={onCustomInputChange}
          />
        </WithIcon>
        <WithIcon icon={<WorkIcon color={'#3f2da5'} />}>
          <ProjectDropDown
            name="projectId"
            onItemPick={onCustomInputChange}
            selectedItemId={values.projectId}
          />
        </WithIcon>
        <WithIcon
          icon={<SheetIcon color={'#3f2da5'} />}
          iconStyle={{ marginTop: '12px' }}
          style={{ alignItems: 'flex-start' }}
        >
          <TextField
            fullWidth
            name="description"
            hintText="Description (optional)"
            multiLine
            onChange={onInputChange}
            rows={6}
            rowsMax={6}
            textareaStyle={{ backgroundColor: '#f7f7f7', padding: '3px 6px' }}
            value={values.description}
          />
        </WithIcon>
        {props.entity && props.entity.author &&
          <p>Author: {props.entity.author.email}</p>
        }
      </div>
    </div>
  );
};

TimeLogForm.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

TimeLogForm.propTypes = {
  entity: PropTypes.shape({
    author: PropTypes.shape({
      email: PropTypes.string,
    }),
  }),
  onCustomInputChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  projectDropDownClass: PropTypes.func.isRequired,
  values: PropTypes.shape({
    description: PropTypes.string,
    hours: PropTypes.number,
    minutes: PropTypes.number,
  }),
};

TimeLogForm.defaultProps = {
  entity: undefined,
  values: undefined,
};

export default TimeLogForm;
