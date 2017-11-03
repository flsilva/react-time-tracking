import React, { Component } from 'react';

const withDialog = (WrappedComponent, DialogComponent) => (
  class extends Component {
    state = { isOpen: false };

    onClickClose = () => {
      this.setState({ isOpen: false });
    }

    onClickOpen = () => {
      this.setState({ isOpen: true });
    }

    render() {
      // TODO: delete the following <div> container and return an array
      // of components after migrating to React 16.
      // that container causes issues, for example if WrappedComponent
      // has styles to make its width expand to whole container, it'll be
      // constrained by this new container, instead of original one,
      // potentially causing issues. In fact, it already cause such issue for
      // DescriptionButtonContainer / DescriptionButton.
      return (
        <div>
          <WrappedComponent {...this.props} onClickOpen={this.onClickOpen} />
          <DialogComponent open={this.state.isOpen} onClickClose={this.onClickClose} />
        </div>
      );
    }
  }
);

export default withDialog;
