import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarGroup } from 'material-ui/Toolbar';
import AppBar from './AppBar';
import AppBarTitle from './AppBarTitle';
import ArrowBackIconButton from '../../common/ArrowBackIconButton';

const ArrowBackAppBar = props => (
  <AppBar>
    <ToolbarGroup firstChild>
      <ArrowBackIconButton onClick={props.onClickBackButton} />
      <AppBarTitle title={props.title} />
    </ToolbarGroup>
    {props.children}
  </AppBar>
);

ArrowBackAppBar.propTypes = {
  children: PropTypes.node,
  onClickBackButton: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

ArrowBackAppBar.defaultProps = {
  children: undefined,
};

export default ArrowBackAppBar;
