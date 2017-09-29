import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import { Field, reduxForm } from 'redux-form';

// renderTextField() must be placed outside DescriptionScreen(),
// otherwise it generates a new input component each time
// DescriptionScreen() is invoked. this creates a bug
// that the input field loses its focus at each keystroke,
// as redux store changes.
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

const DescriptionScreen = (props, context) => {
  const { handleSubmit, isConnecting } = props;
  const { palette } = context.muiTheme;
  const toolbarStyles = {
    backgroundColor: palette.primary1Color,
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
  };

  const submitHandler = (data) => {
    console.log('DescriptionScreen().submitHandler() - data: ', data);
    props.submitHandler(data.description);
  };

  return (
    <div>
      <Toolbar style={toolbarStyles}>
        <ToolbarGroup firstChild>
          <IconButton onClick={props.goBackHandler}>
            <FontIcon
              className="material-icons"
              color={palette.alternateTextColor}
            >
              arrow_back
            </FontIcon>
          </IconButton>
          <ToolbarTitle
            text="Add Description"
            style={{ color: palette.alternateTextColor }}
          />
        </ToolbarGroup>
        <ToolbarGroup lastChild>
          <IconButton onClick={handleSubmit(submitHandler)} disabled={isConnecting}>
            <FontIcon
              className="material-icons"
              color={palette.alternateTextColor}
            >
              done
            </FontIcon>
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
      <div style={{ margin: '25px 10px' }}>
        <Field name="description" component={renderTextField} />
      </div>
    </div>
  );
};

DescriptionScreen.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
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
