import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createEntity, updateEntity } from './ProjectActions';

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ createEntity, updateEntity }, dispatch),
});

export default (WrappedComponent) => {
  function ProjectFormikContainer(props) {
    const redirectToList = () => {
      props.history.push('/app/projects');
    };

    const toFormValues = (entity = {}) => ({
      name: entity.name || '',
    });

    const onSubmit = (values) => {
      const { entity } = props;

      if (entity && entity.id) {
        props.updateEntity(entity.id, values, redirectToList);
      } else {
        props.createEntity(values, redirectToList);
      }
    };

    return (
      <WrappedComponent
        initialValues={toFormValues(props.entity)}
        onSubmit={onSubmit}
        toFormValues={toFormValues}
        {...props}
      />
    );
  }

  ProjectFormikContainer.propTypes = {
    createEntity: PropTypes.func.isRequired,
    entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    updateEntity: PropTypes.func.isRequired,
  };

  ProjectFormikContainer.defaultProps = {
    entity: undefined,
  };

  return connect(
    undefined,
    mapDispatchToProps,
  )(ProjectFormikContainer);
};
