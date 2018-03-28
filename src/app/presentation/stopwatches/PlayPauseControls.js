import React from 'react';
import PropTypes from 'prop-types';
import PlayIcon from 'material-ui/svg-icons/av/play-circle-filled';
import PauseIcon from 'material-ui/svg-icons/av/pause-circle-filled';
import IconButton from 'material-ui/IconButton';

const PlayPauseControls = (props, { muiTheme: { palette } }) => (
  <IconButton
    onClick={() => (props.isRunning ? props.pause() : props.start())}
    iconStyle={{ color: palette.primary1Color, height: 100, width: 100 }}
    style={{ height: 125, width: 125 }}
  >
    {props.isRunning ? <PauseIcon /> : <PlayIcon />}
  </IconButton>
);

PlayPauseControls.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

PlayPauseControls.propTypes = {
  isRunning: PropTypes.bool,
  pause: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
};

PlayPauseControls.defaultProps = {
  isRunning: false,
};

export default PlayPauseControls;
