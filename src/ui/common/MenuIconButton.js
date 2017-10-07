import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const MenuIconButton = (props, { muiTheme: { palette } }) => (
  <IconButton onClick={props.onClick}>
    <FontIcon
      className="material-icons"
      color={props.color || palette.alternateTextColor}
    >
      menu
    </FontIcon>
  </IconButton>
);

MenuIconButton.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

MenuIconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
};

MenuIconButton.defaultProps = {
  color: null,
};

export default MenuIconButton;
