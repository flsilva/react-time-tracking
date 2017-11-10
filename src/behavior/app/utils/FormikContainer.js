import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

export default (FormComponent) => {
  function FormikContainer({ initialValues, onSubmit, ...childProps }) {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={formikProps => (
          <FormComponent
            {...childProps}
            {...formikProps}
          />
        )}
      />
    );
  }

  FormikContainer.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    initialValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  return FormikContainer;
};
