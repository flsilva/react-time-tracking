import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createEntity, deleteEntity, updateEntity } from './ProjectActions';
import { getIsConnecting } from './ProjectState';

export default successCb => (
  (WrappedComponent) => {
    function withEntityForm(props) {
      const onDeleteEntity = () => {
        props.deleteEntity(props.entity.id, successCb);
      };

      const onSubmit = (values) => {
        const { entity } = props;

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
          deleteEntity={onDeleteEntity}
          initialValues={toFormValues(props.entity)}
          onSubmit={onSubmit}
          toFormValues={toFormValues}
        />
      );
    }

    withEntityForm.propTypes = {
      createEntity: PropTypes.func.isRequired,
      deleteEntity: PropTypes.func,
      entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
      isConnecting: PropTypes.bool,
      updateEntity: PropTypes.func.isRequired,
    };

    withEntityForm.defaultProps = {
      deleteEntity: undefined,
      entity: undefined,
      isConnecting: false,
    };

    const mapStateToProps = state => ({
      isConnecting: getIsConnecting(state),
    });

    const mapDispatchToProps = dispatch => ({
      ...bindActionCreators({ createEntity, deleteEntity, updateEntity }, dispatch),
    });

    return connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withEntityForm);
  }
);
