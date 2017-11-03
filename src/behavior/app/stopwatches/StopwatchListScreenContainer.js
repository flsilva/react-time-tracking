import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getNotifications } from '../utils';
import Notifications from '../../../ui/app/utils/Notifications';
import { readEntities } from './StopwatchActions';
import { getEntities } from './StopwatchState';

/*
 * This is a special, but very simple screen / container.
 * Since there's no stopwatch listing screen, we just fetch
 * all available stopwatches here and redirect user to first one.
 * This is needed for example when users are coming from sign in,
 * when we need to first fetch all stopwatches, and then redirect to
 * "./stopwatches/:id".
 * We know the app only supports one stopwatch, so there's only one
 * stopwatch available, and that users can't create or delete stopwatches,
 * but dealing with data like that, i.e., like an usual list of entities,
 * allows us to have an uniform way to deal with entities, i.e., same way
 * to read, update, etc.
 */
class StopwatchListScreenContainer extends Component {
  componentDidMount() {
    const { entities } = this.props;
    if (entities && entities.length) {
      this.redirect();
    }

    const query = this.props.getQuery ? this.props.getQuery() : undefined;
    this.props.actions.readEntities(query);
  }

  componentDidUpdate() {
    const { entities } = this.props;

    if (entities && entities.length) {
      this.redirect();
    }
  }

  redirect() {
    this.props.history.push(`app/stopwatches/${this.props.entities[0].id}`);
  }

  render() {
    return (
      <Notifications notifications={getNotifications(this.props.error, false)} />
    );
  }
}

StopwatchListScreenContainer.propTypes = {
  actions: PropTypes.shape({
    readEntities: PropTypes.func.isRequired,
  }).isRequired,
  entities: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.arrayOf(PropTypes.object),
  getQuery: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

StopwatchListScreenContainer.defaultProps = {
  entities: undefined,
  error: undefined,
  getQuery: undefined,
};

const mapStateToProps = (state, { getQuery }) => {
  const queries = getQuery ? [getQuery()] : undefined;

  return {
    entities: getEntities(state, queries),
    error: state.stopwatches.error,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ readEntities }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StopwatchListScreenContainer);
