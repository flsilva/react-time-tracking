import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarTitle } from 'material-ui/Toolbar';

const AppBarTitle = (props, { muiTheme: { palette } }) => (
  <ToolbarTitle
    style={{ color: props.color || palette.alternateTextColor }}
    text={props.title}
  />
);

AppBarTitle.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

AppBarTitle.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
};

AppBarTitle.defaultProps = {
  color: undefined,
  title: '',
};

export default AppBarTitle;
