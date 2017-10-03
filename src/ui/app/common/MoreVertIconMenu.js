import React from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const MoreVertIconMenu = (props, { muiTheme: { palette } }) => (
  <IconMenu
    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
    iconStyle={{ color: props.color || palette.alternateTextColor }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    {...props}
  >
    {props.children}
  </IconMenu>
);

MoreVertIconMenu.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

MoreVertIconMenu.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  onItemTouchTap: PropTypes.func.isRequired,
};

MoreVertIconMenu.defaultProps = {
  children: null,
  color: null,
};

export default MoreVertIconMenu;
