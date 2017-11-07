import React from 'react';
import PropTypes from 'prop-types';
import ThemeProvider from './ThemeProvider';

const Layout = props => (
  <ThemeProvider>
    <div>
      {props.children}
    </div>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
