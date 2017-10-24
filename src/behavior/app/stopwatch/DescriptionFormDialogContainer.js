import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setActivityDescription } from '../stopwatch/StopwatchActions';
import { getStopwatch } from './StopwatchState';
import DescriptionFormDialog from '../../../ui/app/common/DescriptionFormDialog';

const DescriptionFormDialogContainer = (props) => {
  const { actions, closeHandler, description, id, isEditing, open } = props;

  const saveHandler = (newDescription) => {
    actions.setActivityDescription({ id, description: newDescription });
    closeHandler();
  };

  return (
    <DescriptionFormDialog
      closeHandler={closeHandler}
      description={description}
      isEditing={isEditing}
      onSaveClick={saveHandler}
      open={open}
    />
  );
};

DescriptionFormDialogContainer.propTypes = {
  actions: PropTypes.shape({
    setActivityDescription: PropTypes.func.isRequired,
  }).isRequired,
  closeHandler: PropTypes.func.isRequired,
  description: PropTypes.string,
  id: PropTypes.string,
  isEditing: PropTypes.bool,
  open: PropTypes.bool,
};

DescriptionFormDialogContainer.defaultProps = {
  description: '',
  id: undefined,
  isEditing: false,
  open: false,
};

const mapStateToProps = (state) => {
  const stopwatch = getStopwatch(state) || {};
  const { description, id } = stopwatch;
  const isEditing = description !== '';

  return { description, id, isEditing };
};

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators({ setActivityDescription }, dispatch),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DescriptionFormDialogContainer);
