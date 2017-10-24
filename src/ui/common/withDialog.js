import React, { Component } from 'react';

const withDialog = (WrappedComponent, DialogComponent) => (
  class extends Component {
    state = { isOpen: false };

    closeHandler = () => {
      this.setState({ isOpen: false });
    }

    openHandler = () => {
      this.setState({ isOpen: true });
    }

    render() {
      // TODO: delete that <div> container and return array
      // after migrating to React 16.
      // that container causes issues, for example if WrappedComponent
      // has styles to expand width to whole container, it'll be constrained
      // by this new container, instead of original one.
      return (
        <div>
          <WrappedComponent {...this.props} openHandler={this.openHandler} />
          <DialogComponent open={this.state.isOpen} closeHandler={this.closeHandler} />
        </div>
      );
    }
  }
);

export default withDialog;
