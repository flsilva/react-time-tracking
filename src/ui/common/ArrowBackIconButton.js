import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const ArrowBackIconButton = (props, { muiTheme: { palette } }) => (
  <IconButton onClick={props.onClick}>
    <FontIcon
      className="material-icons"
      color={props.color || palette.alternateTextColor}
    >
      arrow_back
    </FontIcon>
  </IconButton>
);

ArrowBackIconButton.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

ArrowBackIconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
};

ArrowBackIconButton.defaultProps = {
  color: undefined,
};

export default ArrowBackIconButton;
