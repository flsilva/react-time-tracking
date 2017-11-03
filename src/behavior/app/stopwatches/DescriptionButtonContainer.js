import React from 'react';
import PropTypes from 'prop-types';
import DescriptionButton from '../../../ui/app/common/DescriptionButton';

const DescriptionButtonContainer = ({ description, onClickOpen }) => (
  <DescriptionButton
    description={description}
    onClick={onClickOpen}
  />
);

DescriptionButtonContainer.propTypes = {
  description: PropTypes.string,
  onClickOpen: PropTypes.func.isRequired,
};

DescriptionButtonContainer.defaultProps = {
  description: undefined,
};

export default DescriptionButtonContainer;
