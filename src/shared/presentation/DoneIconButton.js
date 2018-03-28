import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const DoneIconButton = (props, { muiTheme: { palette } }) => (
  <IconButton {...props}>
    <FontIcon
      className="material-icons"
      color={props.color || palette.alternateTextColor}
    >
      done
    </FontIcon>
  </IconButton>
);

DoneIconButton.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

DoneIconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
};

DoneIconButton.defaultProps = {
  color: undefined,
};

export default DoneIconButton;
