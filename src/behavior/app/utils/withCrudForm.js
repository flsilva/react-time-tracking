import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default ({ createEntity, successCb, toFormValues, updateEntity }) => (
  (WrappedComponent) => {
    function withCrudForm(props) {
      const onSubmit = (values, entity) => {
        if (entity) {
          props.updateEntity(entity.id, values, successCb);
        } else {
          props.createEntity(values, successCb);
        }
      };

      return (
        <WrappedComponent
          {...props}
          initialValues={toFormValues(props.entity)}
          onSubmit={values => onSubmit(values, props.entity)}
          successCb={successCb}
          toFormValues={toFormValues}
        />
      );
    }

    withCrudForm.propTypes = {
      createEntity: PropTypes.func.isRequired,
      entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
      updateEntity: PropTypes.func.isRequired,
    };

    withCrudForm.defaultProps = {
      entity: undefined,
    };

    const mapDispatchToProps = dispatch => ({
      ...bindActionCreators({ createEntity, updateEntity }, dispatch),
    });

    return connect(
      undefined,
      mapDispatchToProps,
    )(withCrudForm);
  }
);
