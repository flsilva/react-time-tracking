import React from 'react';
import PropTypes from 'prop-types';

const AppLayout = props => (
  <div className="AppLayout">
    <div className="SectionContainer">
      {props.children}
    </div>
  </div>
);

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppLayout;
