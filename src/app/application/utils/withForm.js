import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

export default (FormComponent) => {
  function withForm(props) {
    return (
      <Formik
        initialValues={props.initialValues}
        onSubmit={props.onSubmit}
        render={formikProps => (
          <FormComponent
            {...props}
            {...formikProps}
          />
        )}
      />
    );
  }

  withForm.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    initialValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  return withForm;
};
