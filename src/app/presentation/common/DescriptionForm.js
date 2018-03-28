import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import withDelayedAutoFocus from '../../../shared/presentation/withDelayedAutoFocus';

const DescriptionField = ({ description, handleChange, inputRef }) => (
  <TextField
    fullWidth
    name="description"
    hintText="Description (optional)"
    multiLine
    onChange={handleChange}
    ref={inputRef}
    rows={4}
    rowsMax={8}
    textareaStyle={{ backgroundColor: '#f7f7f7' }}
    value={description}
  />
);

DescriptionField.propTypes = {
  description: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired,
};

DescriptionField.defaultProps = {
  description: '',
};

const DescriptionWithDelayedFocus = withDelayedAutoFocus(DescriptionField);
const DescriptionForm = props => <DescriptionWithDelayedFocus {...props} />;

DescriptionForm.propTypes = {
  autoFocus: PropTypes.bool,
  description: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

DescriptionForm.defaultProps = {
  autoFocus: false,
  description: '',
};

export default DescriptionForm;
