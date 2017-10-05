import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getNotifications } from '../utils';
import Notifications from '../../../ui/app/utils/Notifications';
import { readStopwatch } from './StopwatchActions';
import StopwatchAppBarContainer from './StopwatchAppBarContainer';
import StopwatchTimeAndControlsContainer from './StopwatchTimeAndControlsContainer';
import StopwatchScreenBodyContainer from './StopwatchScreenBodyContainer';

class StopwatchScreenContainer extends Component {

  componentDidMount() {
    this.props.actions.readStopwatch();
  }

  render() {
    return (
      <div>
        <StopwatchAppBarContainer />
        <StopwatchTimeAndControlsContainer />
        <StopwatchScreenBodyContainer />
        <Notifications notifications={getNotifications(this.props.error, false)} />
      </div>
    );
  }
}

StopwatchScreenContainer.propTypes = {
  actions: PropTypes.shape({
    readStopwatch: PropTypes.func.isRequired,
  }).isRequired,
  error: PropTypes.arrayOf(PropTypes.string),
};

StopwatchScreenContainer.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  error: state.stopwatches.error,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ readStopwatch }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StopwatchScreenContainer);
