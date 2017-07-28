import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar } from 'react-toolbox/lib/app_bar';
import FontIcon from 'react-toolbox/lib/font_icon';
import Drawer from 'react-toolbox/lib/drawer';
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
          onLeftIconClick={this.toggleMenu}
          leftIcon={<FontIcon value="menu" />}
          title={this.props.title}
        />
        <Drawer active={this.state.menuActive} onOverlayClick={this.toggleMenu}>
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
