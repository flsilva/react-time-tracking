import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarTitle } from 'material-ui/Toolbar';

const WebsiteBarTitle = (props, { muiTheme: { palette } }) => (
  <ToolbarTitle
    style={{ color: props.color || palette.alternateTextColor }}
    text={props.title}
  />
);

WebsiteBarTitle.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

WebsiteBarTitle.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
};

WebsiteBarTitle.defaultProps = {
  color: undefined,
  title: '',
};

export default WebsiteBarTitle;
