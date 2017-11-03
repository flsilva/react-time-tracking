import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateDescription } from '../stopwatch/StopwatchActions';
import DescriptionFormDialog from '../../../ui/app/common/DescriptionFormDialog';

const DescriptionFormDialogContainer = ({ actions, entity = {}, onClickClose, open }) => {
  const { description, id } = entity;
  const isEditing = description !== '';

  const saveHandler = (newDescription) => {
    actions.updateDescription({ id, description: newDescription });
    onClickClose();
  };

  return (
    <DescriptionFormDialog
      closeHandler={onClickClose}
      description={description}
      isEditing={isEditing}
      onSaveClick={saveHandler}
      open={open}
    />
  );
};

DescriptionFormDialogContainer.propTypes = {
  actions: PropTypes.shape({
    updateDescription: PropTypes.func.isRequired,
  }).isRequired,
  onClickClose: PropTypes.func.isRequired,
  entity: PropTypes.shape({ id: PropTypes.string.isRequired }),
  open: PropTypes.bool,
};

DescriptionFormDialogContainer.defaultProps = {
  entity: undefined,
  open: false,
};

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators({ updateDescription }, dispatch),
  },
});

export default connect(
  undefined,
  mapDispatchToProps,
)(DescriptionFormDialogContainer);
