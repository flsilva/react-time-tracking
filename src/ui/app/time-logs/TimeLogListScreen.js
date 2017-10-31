import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import SimpleAppBar from '../header/SimpleAppBar';
import TimeLogList from './TimeLogList';

const fabStyles = {
  bottom: '20px',
  position: 'fixed',
  right: '20px',
};

const noHoursLoggedMessage = 'You didn\'t log any hours. Start now!';

const TimeLogListScreen = ({ entities, isConnecting, onClickItem, onClickNewTimeLog }) => (
  <div>
    <SimpleAppBar title="Logged Time" />
    <TimeLogList entities={entities} onClickItem={onClickItem} />
    {!isConnecting && (!entities || !entities.length) &&
      <p style={{ margin: '0px 10px', textAlign: 'center' }}>{noHoursLoggedMessage}</p>
    }
    {!isConnecting &&
      <FloatingActionButton style={fabStyles} onClick={onClickNewTimeLog}>
        <ContentAddIcon />
      </FloatingActionButton>
    }
  </div>
);

TimeLogListScreen.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.object),
  isConnecting: PropTypes.bool,
  onClickItem: PropTypes.func.isRequired,
  onClickNewTimeLog: PropTypes.func.isRequired,
};

TimeLogListScreen.defaultProps = {
  entities: undefined,
  isConnecting: false,
};

export default TimeLogListScreen;
