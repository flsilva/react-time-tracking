import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const ProjectForm = ({ onInputChange, values }) => (
  <div>
    <TextField
      hintText="Project name"
      name="name"
      onChange={onInputChange}
      type="text"
      value={values.name}
    />
  </div>
);

ProjectForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string,
  }),
};

ProjectForm.defaultProps = {
  values: undefined,
};

export default ProjectForm;
