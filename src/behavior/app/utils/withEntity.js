import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default ({ getEntityById, getError, getIsConnecting, hasEntity, readEntity }) => (
  (WrappedComponent) => {
    class WithEntity extends Component {
      componentDidMount() {
        const { getQuery, id } = this.props;
        if (id) {
          const query = getQuery ? getQuery(id) : undefined;
          this.props.readEntity(query);
        }
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
      getQuery: PropTypes.func,
      id: PropTypes.string,
      isConnecting: PropTypes.bool,
    };

    WithEntity.defaultProps = {
      getQuery: undefined,
      entity: undefined,
      error: undefined,
      id: undefined,
      isConnecting: false,
    };

    const mapStateToProps = (state, { id }) => ({
      entity: id && hasEntity(state, id) ? getEntityById(state, id) : undefined,
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
