import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createErrorGetter } from '../shared/net/http/responses/errors';
import { createRecordGetter } from '../shared/net/http/responses/records';
import { hasQueryMetaResult } from '../shared/net/http/requests/queries';
import { createConnectionChecker } from '../shared/net/http/requests/connections';

export default ({ readResource, requestId, resourceType }) => (
  (WrappedComponent) => {
    class WithEntity extends Component {
      componentDidMount() {
        const { getQuery, id } = this.props;
        this.props.readResource(getQuery(id));
      }

      render() {
        const { entity, error, isConnecting } = this.props;
        return (
          <WrappedComponent
            entity={entity}
            error={error}
            isConnecting={isConnecting}
            {...this.props}
          />
        );
      }
    }

    WithEntity.propTypes = {
      readResource: PropTypes.func.isRequired,
      entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
      error: PropTypes.arrayOf(PropTypes.object),
      getQuery: PropTypes.func.isRequired,
      id: PropTypes.string.isRequired,
      isConnecting: PropTypes.bool,
    };

    WithEntity.defaultProps = {
      entity: undefined,
      error: undefined,
      isConnecting: false,
    };

    const mapStateToProps = (state, { getQuery, id }) => ({
      entity: hasQueryMetaResult(state, getQuery(id)) ?
        createRecordGetter(resourceType)(state, getQuery(id)) : undefined,
      error: createErrorGetter(requestId)(state),
      isConnecting: createConnectionChecker(requestId)(state),
    });

    const mapDispatchToProps = dispatch => ({
      ...bindActionCreators({ readResource }, dispatch),
    });

    return connect(
      mapStateToProps,
      mapDispatchToProps,
    )(WithEntity);
  }
);
