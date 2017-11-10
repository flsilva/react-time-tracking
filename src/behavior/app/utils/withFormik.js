import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

export default (FormComponent) => {
  function withFormik(props) {
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

  withFormik.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    initialValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  return withFormik;
};
