import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getNotifications } from '../utils';
import Notifications from '../../../ui/app/utils/Notifications';
import { readEntity } from './StopwatchActions';
import { getEntityById } from './StopwatchState';
import StopwatchAppBarContainer from './StopwatchAppBarContainer';
import StopwatchTimeAndControlsContainer from './StopwatchTimeAndControlsContainer';
import StopwatchScreenBodyContainer from './StopwatchScreenBodyContainer';

class StopwatchScreenContainer extends Component {

  componentDidMount() {
    const id = this.props.match.params.stopwatchId;
    const query = (this.props.getQuery) ? this.props.getQuery() : undefined;
    if (id) this.props.actions.readEntity(id, query);
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
    readEntity: PropTypes.func.isRequired,
  }).isRequired,
  entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
  error: PropTypes.arrayOf(PropTypes.object),
  getQuery: PropTypes.func,
  isConnecting: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      stopwatchId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

StopwatchScreenContainer.defaultProps = {
  entity: undefined,
  error: undefined,
  getQuery: undefined,
  isConnecting: false,
};

const mapStateToProps = (state, { match }) => ({
  entity: getEntityById(state, match.params.stopwatchId),
  error: state.stopwatches.error,
  isConnecting: state.stopwatches.isConnecting,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ readEntity }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StopwatchScreenContainer);
