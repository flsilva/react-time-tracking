import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from 'material-ui/Toolbar';

const WebsiteBar = (props, { muiTheme: { palette } }) => (
  <Toolbar
    style={{
      backgroundColor: props.backgroundColor || palette.primary1Color,
      boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
    }}
  >
    {props.children}
  </Toolbar>
);

WebsiteBar.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

WebsiteBar.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
};

WebsiteBar.defaultProps = {
  backgroundColor: null,
};

export default WebsiteBar;
