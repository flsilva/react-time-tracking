import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createEntity, updateEntity } from './ProjectActions';

export default (WrappedComponent) => {
  function withProjectFormik(props) {
    const successCb = () => {
      props.history.push('/app/projects');
    };

    const onSubmit = (values, entity) => {
      if (entity) {
        props.updateEntity(entity.id, values, successCb);
      } else {
        props.createEntity(values, successCb);
      }
    };

    const toFormValues = (entity = {}) => ({
      name: entity.name || '',
    });

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

  withProjectFormik.propTypes = {
    createEntity: PropTypes.func.isRequired,
    entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    updateEntity: PropTypes.func.isRequired,
  };

  withProjectFormik.defaultProps = {
    entity: undefined,
  };

  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({ createEntity, updateEntity }, dispatch),
  });

  return connect(
    undefined,
    mapDispatchToProps,
  )(withProjectFormik);
};
