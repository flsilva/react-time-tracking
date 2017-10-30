import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as TimeLogActions from './TimeLogActions';
import { getEntities, getEntitiesPaginationByQuery } from './TimeLogState';
import TimeLogListScreen from '../../../ui/app/time-logs/TimeLogListScreen';
import Notifications from '../../../ui/app/utils/Notifications';
import { getNotifications } from '../utils';

class TimeLogListScreenContainer extends Component {

  componentDidMount() {
    this.readMore();
  }

  itemsPerPage = 3;

  readMore = () => {
    const query = this.props.getNextPageQuery();
    this.props.actions.readEntities(query);
  }

  shouldDisplayLoadButton = () => {
    const { pagination, isConnecting } = this.props;
    return pagination && pagination.next && !isConnecting;
  };

  render() {
    const { entities, error, isConnecting } = this.props;

    return (
      <div>
        <TimeLogListScreen
          createEntity={this.props.actions.createEntity}
          entities={entities}
          error={error}
          isConnecting={isConnecting}
        />
        {this.shouldDisplayLoadButton() &&
          <RaisedButton
            primary
            fullWidth
            disabled={isConnecting}
            style={{ marginTop: 20 }}
            label="Load More"
            onClick={this.readMore}
          />
        }
        <Notifications notifications={getNotifications(error, isConnecting)} />
      </div>
    );
  }
}

TimeLogListScreenContainer.propTypes = {
  actions: PropTypes.shape({
    createEntity: PropTypes.func.isRequired,
    readEntities: PropTypes.func.isRequired,
  }).isRequired,
  entities: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.arrayOf(PropTypes.object),
  getNextPageQuery: PropTypes.func.isRequired,
  isConnecting: PropTypes.bool,
  pagination: PropTypes.shape({
    next: PropTypes.string,
  }),
};

TimeLogListScreenContainer.defaultProps = {
  entities: undefined,
  error: undefined,
  isConnecting: false,
  pagination: undefined,
};

const mapStateToProps = (state, { queries }) => {
  const queriesArray = Object.keys(queries)
    .map(key => queries[key]);

  const pagination = queriesArray.length ?
    getEntitiesPaginationByQuery(state, queriesArray[queriesArray.length - 1]) : null;

  return {
    entities: getEntities(state, queriesArray),
    pagination,
    error: state.timeLogs.error,
    isConnecting: state.timeLogs.isConnecting,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TimeLogActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeLogListScreenContainer);
