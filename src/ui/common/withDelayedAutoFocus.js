import React, { Component } from 'react';

const withDelayedAutoFocus = (WrappedComponent, delay = 500) => (
  class extends Component {
    componentDidMount() {
      setTimeout(() => this.input.focus(), delay);
    }

    setInput = (input) => {
      this.input = input;
    }

    render() {
      return (
        <WrappedComponent inputRef={this.setInput} {...this.props} />
      );
    }
  }
);

export default withDelayedAutoFocus;
