import React from 'react';
import PropTypes from 'prop-types';
import PlayIcon from 'material-ui/svg-icons/av/play-circle-filled';
import PauseIcon from 'material-ui/svg-icons/av/pause-circle-filled';
import IconButton from 'material-ui/IconButton';

const PlayPauseControls = props => (
  <div style={{ backgroundColor: '#3f2da5', display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
    <IconButton
      onClick={props.toggle}
      iconStyle={{ color: 'rgb(0, 188, 212)', height: 100, width: 100 }}
      style={{ height: 125, width: 125 }}
    >
      {props.isPlaying ? <PauseIcon /> : <PlayIcon />}
    </IconButton>
  </div>
);

PlayPauseControls.propTypes = {
  isPlaying: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
};

PlayPauseControls.defaultProps = {
  isPlaying: false,
};

export default PlayPauseControls;
