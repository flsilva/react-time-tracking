import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getNotifications } from '../utils';
import Notifications from '../../presentation/utils/Notifications';
import { readEntities } from './StopwatchActions';
import { getEntities } from './StopwatchState';
import StopwatchAppBarContainer from './StopwatchAppBarContainer';
import StopwatchTimeAndControlsContainer from './StopwatchTimeAndControlsContainer';
import StopwatchScreenBodyContainerFactory from './StopwatchScreenBodyContainer';

export default (ProjectDropdown) => {
  const StopwatchScreenBodyContainer = StopwatchScreenBodyContainerFactory(ProjectDropdown);

  class StopwatchScreenContainer extends Component {
    state = { entity: undefined };

    componentDidMount() {
      const query = this.props.getQuery ? this.props.getQuery() : undefined;
      this.props.actions.readEntities(query);
    }

    render() {
      const { entity, error, isConnecting } = this.props;
      const id = entity ? entity.id : undefined;

      return (
        <div>
          <StopwatchAppBarContainer entityId={id} />
          <StopwatchTimeAndControlsContainer entity={entity} isConnecting={isConnecting} />
          <StopwatchScreenBodyContainer entity={entity} />
          <Notifications notifications={getNotifications(error, false)} />
        </div>
      );
    }
  }

  StopwatchScreenContainer.propTypes = {
    actions: PropTypes.shape({
      readEntities: PropTypes.func.isRequired,
    }).isRequired,
    entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
    error: PropTypes.arrayOf(PropTypes.object),
    getQuery: PropTypes.func,
    isConnecting: PropTypes.bool,
  };

  StopwatchScreenContainer.defaultProps = {
    entity: undefined,
    error: undefined,
    getQuery: undefined,
    isConnecting: false,
  };

  const mapStateToProps = (state, { getQuery }) => {
    const query = getQuery ? getQuery() : undefined;
    const result = getEntities(state, query);
    const entities = result ? result.entities : undefined;
    const entity = entities && entities.length ? entities[0] : undefined;

    return {
      entity,
      error: state.stopwatches.error,
      isConnecting: state.stopwatches.isConnecting,
    };
  };

  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ readEntities }, dispatch),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(StopwatchScreenContainer);
};
