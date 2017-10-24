import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DescriptionForm from './DescriptionForm';

const contentStyle = {
  maxWidth: '90%',
  height: '350px', // TODO: make it dynamic according to device's viewport
  transform: 'translate(0px, -10px)',
  width: '90%',
};

const bodyStyle = { paddingBottom: 0 };
const titleStyle = { paddingBottom: '5px' };

const DescriptionFormDialog = (props) => {
  const {
    closeHandler,
    handleChange,
    handleReset,
    handleSubmit,
    isEditing,
    open,
    values,
  } = props;

  const resetAndClose = () => {
    handleReset();
    closeHandler();
  };

  const actions = [
    <FlatButton
      label="Cancel"
      onClick={resetAndClose}
    />,
    <FlatButton
      label="Save"
      primary
      onClick={handleSubmit}
    />,
  ];

  const title = isEditing ? 'Edit Description' : 'Add Description';

  return (
    <Dialog
      autoDetectWindowHeight={false}
      bodyStyle={bodyStyle}
      contentStyle={contentStyle}
      title={title}
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={resetAndClose}
      titleStyle={titleStyle}
    >
      <DescriptionForm description={values.description} handleChange={handleChange} />
    </Dialog>
  );
};

const DescriptionFormDialogWithFormik = withFormik({
  /*
   * TODO: find out why this is not working in the first time it's rendered.
   * values.description is an empty string even though props.description
   * holds an actual string value. after closing dialog once (and because of calling
   * handleReset) it works when opening it again.
   * Perhaps it's because the target input field is within a closed Dialog,
   * and so its DOM element (<textarea> in this case) is not attached to the DOM tree.
   */
  mapPropsToValues: props => ({ description: props.description }),
  /**/
  handleSubmit: (values, { props }) => {
    props.onSaveClick(values.description);
  },
  displayName: 'DescriptionDialog', // helps with React DevTools
})(DescriptionFormDialog);

DescriptionFormDialog.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  // description is used from within DescriptionDialogWithFormik
  // eslint-disable-next-line react/no-unused-prop-types
  description: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  // onSaveClick is used from within DescriptionDialogWithFormik
  // eslint-disable-next-line react/no-unused-prop-types
  onSaveClick: PropTypes.func.isRequired,
  open: PropTypes.bool,
  values: PropTypes.shape({ description: PropTypes.string }),
};

DescriptionFormDialog.defaultProps = {
  description: '',
  isEditing: false,
  open: false,
  values: undefined,
};

export default DescriptionFormDialogWithFormik;
