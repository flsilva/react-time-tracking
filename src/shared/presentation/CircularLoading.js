import React from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import CircularProgress from 'material-ui/CircularProgress';

const CircularLoading = (props, { muiTheme: { palette } }) => (
  <CircularProgress
    color={palette.primary1Color}
    size={props.size}
    thickness={props.thickness}
    style={props.style}
  />
);

CircularLoading.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

CircularLoading.propTypes = {
  size: PropTypes.number,
  style: stylePropType,
  thickness: PropTypes.number,
};

CircularLoading.defaultProps = {
  size: 50,
  style: undefined,
  thickness: 4,
};

export default CircularLoading;
