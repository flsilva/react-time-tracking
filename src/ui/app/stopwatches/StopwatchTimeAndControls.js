import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import PlayPauseControls from './PlayPauseControls';
import TimeElapsed from './TimeElapsed';

const styles = {
  container: {
    backgroundColor: '#3f2da5',
    paddingBottom: 20,
  },
  playPauseControls: {
    alignItems: 'center',
    backgroundColor: '#3f2da5',
    display: 'flex',
    justifyContent: 'center',
    height: 125,
    paddingTop: 10,
  },
};

const StopwatchTimeAndControls = (props) => {
  const { elapsedTime, isRunning, startedAt } = props;

  let controls;

  if (props.isConnecting) {
    controls = <CircularProgress color={'rgb(0, 188, 212)'} size={50} thickness={4} />;
  } else {
    controls = (
      <PlayPauseControls
        isRunning={isRunning}
        pause={props.pauseStopwatch}
        start={props.startStopwatch}
      />
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.playPauseControls}>
        {controls}
      </div>
      <TimeElapsed
        elapsedTime={elapsedTime}
        getElapsedTimeObject={props.getElapsedTimeObject}
        onHourPick={props.onHourPick}
        isRunning={isRunning}
        onMinutePick={props.onMinutePick}
        startedAt={startedAt}
      />
    </div>
  );
};

StopwatchTimeAndControls.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

StopwatchTimeAndControls.propTypes = {
  elapsedTime: PropTypes.number,
  getElapsedTimeObject: PropTypes.func.isRequired,
  isRunning: PropTypes.bool,
  startedAt: PropTypes.instanceOf(Date),
  onHourPick: PropTypes.func.isRequired,
  isConnecting: PropTypes.bool.isRequired,
  onMinutePick: PropTypes.func.isRequired,
  pauseStopwatch: PropTypes.func.isRequired,
  startStopwatch: PropTypes.func.isRequired,
};

StopwatchTimeAndControls.defaultProps = {
  elapsedTime: 0,
  data: {},
  isConnecting: false,
  isRunning: false,
  startedAt: null,
};

export default StopwatchTimeAndControls;
