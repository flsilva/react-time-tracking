import React from 'react';
import PropTypes from 'prop-types';

const AppLayout = props => (
  <div>
    {props.children}
  </div>
);

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppLayout;
