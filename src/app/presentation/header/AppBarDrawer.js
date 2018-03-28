import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MainNav from '../nav/MainNav';

const AppBarDrawer = props => (
  <Drawer
    docked={false}
    open={props.open}
    onRequestChange={props.onRequestChange}
  >
    <MainNav />
  </Drawer>
);

AppBarDrawer.propTypes = {
  docked: PropTypes.bool,
  onRequestChange: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

AppBarDrawer.defaultProps = {
  docked: false,
  open: false,
};

export default AppBarDrawer;
