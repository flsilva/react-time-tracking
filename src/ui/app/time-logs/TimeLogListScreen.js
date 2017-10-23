import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import SimpleAppBar from '../header/SimpleAppBar';
import TimeLogList from './TimeLogList';

const fabStyles = {
  bottom: '20px',
  position: 'fixed',
  right: '20px',
};

const navToNewTimeLog = () => {
  browserHistory.push('/app/time-logs/new');
};

const noHoursLoggedMessage = 'You didn\'t log any hours. Start now!';

const TimeLogListScreen = props => (
  <div>
    <SimpleAppBar title="Logged Time" />
    <TimeLogList data={props.data} />
    {!props.isConnecting && (!props.data || !props.data.length) &&
      <p style={{ margin: '0px 10px', textAlign: 'center' }}>{noHoursLoggedMessage}</p>
    }
    {!props.isConnecting &&
      <FloatingActionButton style={fabStyles} onClick={navToNewTimeLog}>
        <ContentAddIcon />
      </FloatingActionButton>
    }
  </div>
);

TimeLogListScreen.propTypes = {
  isConnecting: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
};

TimeLogListScreen.defaultProps = {
  data: null,
  isConnecting: false,
};

export default TimeLogListScreen;
