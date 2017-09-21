import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MainNav from '../nav/MainNav';

class WebsiteHeader extends Component {

  state = {
    menuActive: false,
  }

  toggleMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }

  render() {
    return (
      <div className="WebsiteHeader">
        <AppBar
          onLeftIconButtonTouchTap={this.toggleMenu}
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

WebsiteHeader.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

WebsiteHeader.defaultProps = {
  user: null,
};

export default WebsiteHeader;
