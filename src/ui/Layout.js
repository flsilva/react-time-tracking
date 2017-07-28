import React from 'react';
import PropTypes from 'prop-types';

const Layout = props => (
  <div className="Layout">
    {props.children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
