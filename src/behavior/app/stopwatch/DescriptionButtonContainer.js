import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStopwatch } from './StopwatchState';
import withDialog from '../../../ui/common/withDialog';
import DescriptionButton from '../../../ui/app/common/DescriptionButton';
import DescriptionFormDialogContainer from './DescriptionFormDialogContainer';

const DescriptionButtonContainer = ({ description, openHandler }) => (
  <DescriptionButton
    description={description}
    onClick={openHandler}
  />
);

DescriptionButtonContainer.propTypes = {
  description: PropTypes.string,
  openHandler: PropTypes.func.isRequired,
};

DescriptionButtonContainer.defaultProps = {
  description: undefined,
};

const mapStateToProps = (state) => {
  const stopwatch = getStopwatch(state) || {};
  const { description } = stopwatch;

  return { description };
};

const ConnectedContainer = connect(mapStateToProps)(DescriptionButtonContainer);
export default withDialog(ConnectedContainer, DescriptionFormDialogContainer);
