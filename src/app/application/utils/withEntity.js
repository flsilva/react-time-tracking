import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default ({ getError, getIsConnecting, getRecord, hasQueryMetaResult, readResource }) => (
  (WrappedComponent) => {
    class WithEntity extends Component {
      componentDidMount() {
        const { getQuery, id } = this.props;
        this.props.readResource({ query: getQuery(id) });
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
      entity: hasQueryMetaResult(state, getQuery(id)) ? getRecord(state, getQuery(id)) : undefined,
      error: getError(state),
      isConnecting: getIsConnecting(state),
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
