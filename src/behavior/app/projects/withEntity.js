import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { readEntity } from './ProjectActions';
import { getEntityById } from './ProjectState';

export default (WrappedComponent) => {
  class WithEntity extends Component {
    componentDidMount() {
      const { id } = this.props;
      const query = (this.props.getQuery) ? this.props.getQuery() : undefined;
      if (id) this.props.readEntity(id, query);
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

  const mapStateToProps = (state, props) => ({
    entity: props.id ? getEntityById(state, props.id) : undefined,
    error: state.projects.error,
    isConnecting: state.projects.isConnecting,
  });

  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({ readEntity }, dispatch),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WithEntity);
};
