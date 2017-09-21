import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
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
    const { palette } = this.context.muiTheme;
    const toolbarStyles = {
      backgroundColor: palette.primary1Color,
      boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
    };

    return (
      <div className="AppHeader">
        <Toolbar style={toolbarStyles}>
          <ToolbarGroup firstChild>
            <IconButton onClick={this.toggleMenu}>
              <FontIcon className="material-icons" color={palette.alternateTextColor}>menu</FontIcon>
            </IconButton>
            <ToolbarTitle text={this.props.title} style={{ color: palette.alternateTextColor }} />
          </ToolbarGroup>
        </Toolbar>
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

AppHeader.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

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
