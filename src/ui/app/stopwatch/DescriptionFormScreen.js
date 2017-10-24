import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { ToolbarGroup } from 'material-ui/Toolbar';
import ArrowBackAppBar from '../header/ArrowBackAppBar';
import DoneIconButton from '../../common/DoneIconButton';
import DescriptionForm from '../common/DescriptionForm';

const DescriptionFormScreen = (props) => {
  const { goBackHandler, handleChange, handleSubmit, isConnecting, values } = props;

  return (
    <div>
      <ArrowBackAppBar title="Add Description" onClickBackButton={goBackHandler}>
        <ToolbarGroup lastChild>
          <DoneIconButton onClick={handleSubmit} disabled={isConnecting} />
        </ToolbarGroup>
      </ArrowBackAppBar>
      <div style={{ margin: '25px 10px' }}>
        <DescriptionForm description={values.description} handleChange={handleChange} />
      </div>
    </div>
  );
};

const DescriptionFormScreenWithFormik = withFormik({
  mapPropsToValues: props => ({ description: props.description }),
  handleSubmit: (values, { props }) => {
    props.submitHandler(values.description);
  },
  displayName: 'DescriptionForm', // helps with React DevTools
})(DescriptionFormScreen);

DescriptionFormScreen.propTypes = {
  // description is used from within DescriptionFormScreenWithFormik
  // eslint-disable-next-line react/no-unused-prop-types
  description: PropTypes.string,
  goBackHandler: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isConnecting: PropTypes.bool,
  // submitHandler is used from within DescriptionFormScreenWithFormik
  // eslint-disable-next-line react/no-unused-prop-types
  submitHandler: PropTypes.func.isRequired,
  values: PropTypes.shape({ description: PropTypes.string }),
};

DescriptionFormScreen.defaultProps = {
  description: '',
  isConnecting: false,
  values: undefined,
};

export default DescriptionFormScreenWithFormik;
