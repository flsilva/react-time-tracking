import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: '#3f2da5',
  },
});

const ThemeProvider = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    {props.children}
  </MuiThemeProvider>
);

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ThemeProvider;
