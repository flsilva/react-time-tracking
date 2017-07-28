import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar } from 'react-toolbox/lib/app_bar';
import FontIcon from 'react-toolbox/lib/font_icon';
import Drawer from 'react-toolbox/lib/drawer';
import Logo from '../../common/logo/Logo';
import MainNav from '../nav/MainNav';

/*
const WebsiteHeader = (props) => (
  <div className="WebsiteHeader">
    <AppBar
      leftIcon={<Logo />}
      rightIcon={<FontIcon value='menu' />}
    />
  </div>
)
*/

/*
const WebsiteHeader = (props) => (
  <div className="WebsiteHeader">
    <AppBar
      leftIcon={<Logo />}
      rightIcon={<FontIcon value='menu' />}
    />
    <Drawer active={this.state.active} onOverlayClick={this.handleToggle}>
      <h5>This is your Drawer.</h5>
      <p>You can embed any content you want, for example a Menu.</p>
    </Drawer>
  </div>
)
*/

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
          onLeftIconClick={this.toggleMenu}
          leftIcon={<FontIcon value="menu" />}
        >
          <Logo />
        </AppBar>
        <Drawer active={this.state.menuActive} onOverlayClick={this.toggleMenu}>
          <MainNav user={this.props.user} />
        </Drawer>
      </div>
      /*
      <div className="WebsiteHeader">
        <AppBar
          leftIcon={<Logo />}
          onRightIconClick={this.toggleMenu}
          rightIcon={<FontIcon value='menu' />}
        />
        <Drawer type="right" active={this.state.menuActive} onOverlayClick={this.toggleMenu}>
          <MainNav user={this.props.user} />
        </Drawer>
      </div>
      */
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
