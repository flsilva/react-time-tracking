import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import flatten from 'lodash/flatten';
import RaisedButton from 'material-ui/RaisedButton';
import * as TimeLogActions from './TimeLogActions';
import { getEntities } from './TimeLogState';
import TimeLogListScreen from '../../presentation/time-logs/TimeLogListScreen';
import Notifications from '../../presentation/utils/Notifications';
import { getNotifications } from '../utils';

class TimeLogListScreenContainer extends Component {

  componentDidMount() {
    this.readMore();
  }

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
          onClickNewTimeLog={() => this.props.history.push('/app/time-logs/new')}
          onClickItem={id => this.props.history.push(`/app/time-logs/${id}`)}
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
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
  const results = queries && queries.length ?
    queries.map(query => getEntities(state, query))
      .filter(result => result)
    : undefined;

  const entities = results && results.length ?
    flatten(
      results.map(result => (
        result ? result.entities : undefined
      )),
    ) : undefined;

  const lastPageResult = queries && queries.length ?
    getEntities(state, queries[queries.length - 1]) : undefined;

  const pagination = lastPageResult ? lastPageResult.pagination : undefined;

  return {
    entities,
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
