import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MainNav from '../nav/MainNav';

const WebsiteBarDrawer = props => (
  <Drawer
    docked={false}
    open={props.open}
    onRequestChange={props.onRequestChange}
  >
    <MainNav />
  </Drawer>
);

WebsiteBarDrawer.propTypes = {
  docked: PropTypes.bool,
  onRequestChange: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

WebsiteBarDrawer.defaultProps = {
  docked: false,
  open: false,
};

export default WebsiteBarDrawer;
