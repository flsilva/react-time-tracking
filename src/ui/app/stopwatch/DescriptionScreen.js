import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarGroup } from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import { Field, reduxForm } from 'redux-form';
import ArrowBackAppBar from '../header/ArrowBackAppBar';
import DoneIconButton from '../../common/DoneIconButton';

// renderTextField() must be placed outside DescriptionScreen(),
// otherwise it generates a new input component each time
// DescriptionScreen() is invoked. this creates a bug
// that the input field loses its focus at each keystroke,
// because redux store changes, reinvoking DescriptionScreen() function.
// eslint-disable-next-line react/prop-types
const renderTextField = ({ input }) => (
  <TextField
    fullWidth
    hintText="Description (optional)"
    multiLine
    rows={6}
    rowsMax={8}
    {...input}
    textareaStyle={{ backgroundColor: '#f7f7f7' }}
  />
);

const DescriptionScreen = (props) => {
  const { handleSubmit, isConnecting } = props;

  const submitHandler = (data) => {
    props.submitHandler(data.description);
  };

  return (
    <div>
      <ArrowBackAppBar title="Add Description" onClickBackButton={props.goBackHandler}>
        <ToolbarGroup lastChild>
          <DoneIconButton onClick={handleSubmit(submitHandler)} disabled={isConnecting} />
        </ToolbarGroup>
      </ArrowBackAppBar>
      <div style={{ margin: '25px 10px' }}>
        <Field name="description" component={renderTextField} />
      </div>
    </div>
  );
};

DescriptionScreen.propTypes = {
  goBackHandler: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isConnecting: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
};

DescriptionScreen.defaultProps = {
  isConnecting: false,
};

export default reduxForm({
  form: 'app/stopwatch/form/description',
})(DescriptionScreen);
