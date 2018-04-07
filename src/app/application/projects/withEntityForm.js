import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createIsConnectingGetter } from '../shared/net/http/requests/connecting/Repository';
import {
  createAfterUpdateResourcesLifeCycle,
  createPatchPayload,
  createPostPayload,
  createPayloadRelationship,
} from '../shared/net/http/requests/Utils';
import {
  createResource,
  deleteResource,
  updateResource,
  REQUEST_ID,
  RESOURCE_TYPE,
} from './ProjectActions';

export default successCb => (
  (WrappedComponent) => {
    function withEntityForm(props) {
      const onDeleteResource = () => {
        props.deleteResource(
          props.entity.id,
          createAfterUpdateResourcesLifeCycle({ fn: successCb }),
        );
      };

      const onSubmit = (attributes) => {
        const { entity } = props;

        if (entity) {
          props.updateResource(
            createPatchPayload(RESOURCE_TYPE, entity.id, attributes),
            createAfterUpdateResourcesLifeCycle({ fn: successCb }),
          );
        } else {
          const authorRelId = { id: 'AUTH_USER_ID', type: 'users' };
          const relationships = createPayloadRelationship('author', authorRelId);

          props.createResource(
            createPostPayload(RESOURCE_TYPE, attributes, relationships),
            createAfterUpdateResourcesLifeCycle({ fn: successCb }),
          );
        }
      };

      const toFormValues = (entity = {}) => ({
        name: entity.name || '',
      });

      return (
        <WrappedComponent
          {...props}
          deleteEntity={onDeleteResource}
          initialValues={toFormValues(props.entity)}
          onSubmit={onSubmit}
          toFormValues={toFormValues}
        />
      );
    }

    withEntityForm.propTypes = {
      createResource: PropTypes.func.isRequired,
      deleteResource: PropTypes.func,
      entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
      isConnecting: PropTypes.bool,
      updateResource: PropTypes.func.isRequired,
    };

    withEntityForm.defaultProps = {
      deleteResource: undefined,
      entity: undefined,
      isConnecting: false,
    };

    const mapStateToProps = state => ({
      isConnecting: createIsConnectingGetter(REQUEST_ID)(state),
    });

    const mapDispatchToProps = dispatch => ({
      ...bindActionCreators({ createResource, deleteResource, updateResource }, dispatch),
    });

    return connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withEntityForm);
  }
);
