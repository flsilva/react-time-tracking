import React, { Component, PropTypes } from 'react'
import { AppBar } from 'react-toolbox/lib/app_bar'
import FontIcon from 'react-toolbox/lib/font_icon'
import Drawer from 'react-toolbox/lib/drawer'
import MainNav from '../nav/MainNav'

class AppHeader extends Component {

  static propTypes = {
    title: PropTypes.string,
    user: PropTypes.object
  }

  state = {
    menuActive: false
  }

  toggleMenu = () => {
    this.setState({menuActive: !this.state.menuActive})
  }

  render() {
    return (
      <div className="AppHeader">
        <AppBar
          onLeftIconClick={this.toggleMenu}
          leftIcon={<FontIcon value='menu' />}
          title={this.props.title}
        />
        <Drawer active={this.state.menuActive} onOverlayClick={this.toggleMenu}>
          <MainNav user={this.props.user} />
        </Drawer>
      </div>
    )
  }
}

export default AppHeader

