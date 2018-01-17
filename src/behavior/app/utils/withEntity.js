import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default ({ getEntity, getError, getIsConnecting, isQueryCached, readEntity }) => (
  (WrappedComponent) => {
    class WithEntity extends Component {
      componentDidMount() {
        const { getQuery, id } = this.props;
        this.props.readEntity(getQuery(id));
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
      readEntity: PropTypes.func.isRequired,
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
      entity: isQueryCached(state, getQuery(id)) ? getEntity(state, getQuery(id)) : undefined,
      error: getError(state),
      isConnecting: getIsConnecting(state),
    });

    const mapDispatchToProps = dispatch => ({
      ...bindActionCreators({ readEntity }, dispatch),
    });

    return connect(
      mapStateToProps,
      mapDispatchToProps,
    )(WithEntity);
  }
);
