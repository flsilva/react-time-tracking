import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarGroup } from 'material-ui/Toolbar';
import WebsiteBar from './WebsiteBar';
import WebsiteBarTitle from './WebsiteBarTitle';
import WebsiteBarDrawer from './WebsiteBarDrawer';
import MenuIconButton from '../../common/MenuIconButton';
import withDrawer from '../../common/withDrawer';

const WebsiteHeader = props => (
  <WebsiteBar>
    <ToolbarGroup firstChild>
      <MenuIconButton onClick={props.onToggleDrawer} />
      <WebsiteBarTitle title={props.title} />
    </ToolbarGroup>
    {props.children}
  </WebsiteBar>
);

WebsiteHeader.propTypes = {
  children: PropTypes.node,
  onToggleDrawer: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

WebsiteHeader.defaultProps = {
  children: undefined,
};

export default withDrawer(WebsiteHeader, WebsiteBarDrawer);
