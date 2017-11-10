import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default ({ createEntity, deleteEntity, successCb, toFormValues, updateEntity }) => (
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
          deleteEntity={() => props.deleteEntity(props.entity.id, successCb)}
          initialValues={toFormValues(props.entity)}
          onSubmit={values => onSubmit(values, props.entity)}
          toFormValues={toFormValues}
        />
      );
    }

    withCrudForm.propTypes = {
      createEntity: PropTypes.func.isRequired,
      deleteEntity: PropTypes.func,
      entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
      updateEntity: PropTypes.func.isRequired,
    };

    withCrudForm.defaultProps = {
      deleteEntity: undefined,
      entity: undefined,
    };

    const mapDispatchToProps = dispatch => ({
      ...bindActionCreators({ createEntity, deleteEntity, updateEntity }, dispatch),
    });

    return connect(
      undefined,
      mapDispatchToProps,
    )(withCrudForm);
  }
);
