import React from 'react';
import PropTypes from 'prop-types';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import IconFieldWrap from '../common/IconFieldWrap';
import StopwatchDescriptionButton from './StopwatchDescriptionButton';


const Description = (props) => {
  const Icon = <DescriptionIcon color="#3f2da5" />;

  return (
    <IconFieldWrap icon={Icon}>
      <StopwatchDescriptionButton
        description={props.description}
        onClick={props.onClick}
      />
    </IconFieldWrap>
  );
};

Description.propTypes = {
  description: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Description.defaultProps = {
  description: '',
};

export default Description;
