import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import ArrowBackAppBar from '../header/ArrowBackAppBar';
import DoneIconButton from '../../common/DoneIconButton';
import MoreVertIconMenu from '../../common/MoreVertIconMenu';

const MENU_ITEM_DELETE = 'MENU_ITEM_DELETE';

const ProjectFormAppBar = (props) => {
  const { deleteHandler, isConnecting, isEditing, goBackHandler, submitHandler } = props;

  const iconMenuItemClickHandler = (event, child) => {
    if (child.props.value === MENU_ITEM_DELETE) {
      deleteHandler();
    }
  };

  const title = isEditing ? 'Edit Project' : 'New Project';

  return (
    <ArrowBackAppBar title={title} onClickBackButton={goBackHandler}>
      <ToolbarGroup lastChild>
        <DoneIconButton onClick={submitHandler} disabled={isConnecting} />
        {isEditing &&
          <MoreVertIconMenu onItemTouchTap={iconMenuItemClickHandler}>
            <MenuItem primaryText="Delete" value={MENU_ITEM_DELETE} />
          </MoreVertIconMenu>
        }
      </ToolbarGroup>
    </ArrowBackAppBar>
  );
};

ProjectFormAppBar.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  goBackHandler: PropTypes.func.isRequired,
  isConnecting: PropTypes.bool,
  isEditing: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
};

ProjectFormAppBar.defaultProps = {
  isConnecting: false,
  isEditing: false,
};

export default ProjectFormAppBar;
