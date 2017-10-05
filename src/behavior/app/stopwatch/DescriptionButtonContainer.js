import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getStopwatch } from './StopwatchReducers';
import Description from '../../../ui/app/stopwatch/Description';

const DescriptionButtonContainer = props => (
  <Description
    description={props.description}
    onClick={() => browserHistory.push('/app/log-description')}
  />
);

DescriptionButtonContainer.propTypes = {
  description: PropTypes.string,
};

DescriptionButtonContainer.defaultProps = {
  description: null,
};

const mapStateToProps = (state) => {
  const stopwatch = getStopwatch(state) || {};
  const { description } = stopwatch;

  return { description };
};

export default connect(
  mapStateToProps,
)(DescriptionButtonContainer);
