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
    this.props.actions.readEntities(this.props.getNextPageQuery(this.itemsPerPage));
  }

  shouldDisplayLoadButton = () => {
    const { pagination, isConnecting } = this.props.timeLogs;
    return pagination && pagination.next && !isConnecting;
  };

  render() {
    const { isConnecting, error } = this.props.timeLogs;

    return (
      <div>
        <TimeLogListScreen
          createEntity={this.props.actions.createEntity}
          error={error}
          isConnecting={this.props.timeLogs.isConnecting}
          data={this.props.timeLogs.list}
          user={this.props.user}
        />
        {this.shouldDisplayLoadButton() &&
          <RaisedButton
            primary
            fullWidth
            disabled={this.props.timeLogs.isConnecting}
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
  getNextPageQuery: PropTypes.func.isRequired,

  actions: PropTypes.shape({
    createEntity: PropTypes.func.isRequired,
    readEntities: PropTypes.func.isRequired,
  }).isRequired,

  timeLogs: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.shape({
      next: PropTypes.string,
    }),
    error: PropTypes.arrayOf(PropTypes.object),
    isConnecting: PropTypes.bool,
  }),

  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

TimeLogListScreenContainer.defaultProps = {
  timeLogs: null,
  user: null,
};

const mapStateToProps = (state, { queries = [] }) => {
  const pagination = queries.length ?
    getEntitiesPaginationByQuery(state, queries[queries.length - 1]) : null;

  return ({
    timeLogs: {
      list: getEntities(state, queries),
      pagination,
      error: state.timeLogs.error,
      isConnecting: state.timeLogs.isConnecting,
    },
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TimeLogActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeLogListScreenContainer);
