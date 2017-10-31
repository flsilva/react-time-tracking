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

const TimeLogListScreen = ({ entities, isConnecting }) => (
  <div>
    <SimpleAppBar title="Logged Time" />
    <TimeLogList entities={entities} />
    {!isConnecting && (!entities || !entities.length) &&
      <p style={{ margin: '0px 10px', textAlign: 'center' }}>{noHoursLoggedMessage}</p>
    }
    {!isConnecting &&
      <FloatingActionButton style={fabStyles} onClick={navToNewTimeLog}>
        <ContentAddIcon />
      </FloatingActionButton>
    }
  </div>
);

TimeLogListScreen.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.object),
  isConnecting: PropTypes.bool,
};

TimeLogListScreen.defaultProps = {
  entities: undefined,
  isConnecting: false,
};

export default TimeLogListScreen;
