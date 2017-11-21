import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (WrappedComponent) => {
  class WithAsyncEntityForm extends Component {
    componentWillReceiveProps(nextProps) {
      if (!this.props.entity && nextProps.entity) {
        this.props.setValues(this.props.toFormValues(nextProps.entity));
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithAsyncEntityForm.propTypes = {
    entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
    setValues: PropTypes.func.isRequired,
    toFormValues: PropTypes.func.isRequired,
    values: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  };

  WithAsyncEntityForm.defaultProps = {
    entity: undefined,
  };

  return WithAsyncEntityForm;
};
