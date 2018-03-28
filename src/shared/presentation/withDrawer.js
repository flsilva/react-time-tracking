import React, { Component } from 'react';

const withDrawer = (WrappedComponent, DrawerComponent) => (
  class extends Component {
    state = { isActive: false };

    toggleHandler = () => {
      this.setState({ isActive: !this.state.isActive });
    }

    render() {
      return (
        <div>
          <WrappedComponent {...this.props} onToggleDrawer={this.toggleHandler} />
          <DrawerComponent open={this.state.isActive} onRequestChange={this.toggleHandler} />
        </div>
      );
    }
  }
);

export default withDrawer;
