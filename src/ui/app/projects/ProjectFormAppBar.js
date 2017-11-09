import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import ArrowBackAppBar from '../header/ArrowBackAppBar';
import DoneIconButton from '../../common/DoneIconButton';
import MoreVertIconMenu from '../../common/MoreVertIconMenu';

const MENU_ITEM_DELETE = 'MENU_ITEM_DELETE';

const ProjectFormAppBar = (props) => {
  const { deleteHandler, isConnecting, goBackHandler, submitHandler, title } = props;

  const iconMenuItemClickHandler = (event, child) => {
    if (child.props.value === MENU_ITEM_DELETE) {
      deleteHandler();
    }
  };

  return (
    <ArrowBackAppBar title={title} onClickBackButton={goBackHandler}>
      <ToolbarGroup lastChild>
        <DoneIconButton onClick={submitHandler} disabled={isConnecting} />
        <MoreVertIconMenu onItemTouchTap={iconMenuItemClickHandler}>
          <MenuItem primaryText="Delete" value={MENU_ITEM_DELETE} />
        </MoreVertIconMenu>
      </ToolbarGroup>
    </ArrowBackAppBar>
  );
};

ProjectFormAppBar.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  goBackHandler: PropTypes.func.isRequired,
  isConnecting: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
  title: PropTypes.string,
};

ProjectFormAppBar.defaultProps = {
  isConnecting: false,
  title: '',
};

export default ProjectFormAppBar;
