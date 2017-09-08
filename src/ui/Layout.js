import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Layout = props => (
  <MuiThemeProvider>
    <div className="Layout">
      {props.children}
    </div>
  </MuiThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
