import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MainNav from '../nav/MainNav';

class AppHeader extends Component {

  state = {
    menuActive: false,
  }

  toggleMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }

  render() {
    return (
      <div className="AppHeader">
        <AppBar
          onLeftIconButtonTouchTap={this.toggleMenu}
          title={this.props.title}
        />
        <Drawer
          docked={false}
          open={this.state.menuActive}
          onRequestChange={this.toggleMenu}
        >
          <MainNav user={this.props.user} />
        </Drawer>
      </div>
    );
  }
}

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

AppHeader.defaultProps = {
  user: null,
};

export default AppHeader;
