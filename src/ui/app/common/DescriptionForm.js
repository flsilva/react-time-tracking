import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const DescriptionForm = (props) => {
  const { handleChange } = props;

  return (
    <div>
      <TextField
        fullWidth
        name="description"
        hintText="Description (optional)"
        multiLine
        onChange={handleChange}
        rows={6}
        rowsMax={8}
        textareaStyle={{ backgroundColor: '#f7f7f7' }}
        value={props.description}
      />
    </div>
  );
};

DescriptionForm.propTypes = {
  description: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

DescriptionForm.defaultProps = {
  description: '',
};

export default DescriptionForm;
