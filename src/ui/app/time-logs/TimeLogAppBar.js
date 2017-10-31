import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import ArrowBackAppBar from '../header/ArrowBackAppBar';
import DoneIconButton from '../../common/DoneIconButton';
import MoreVertIconMenu from '../../common/MoreVertIconMenu';

const MENU_ITEM_DELETE = 'MENU_ITEM_DELETE';

const TimeLogAppBar = (props) => {
  const { entityId, goBackHandler, deleteHandler, isConnecting, submitHandler } = props;

  const iconMenuItemClickHandler = (event, child) => {
    if (child.props.value === MENU_ITEM_DELETE) {
      deleteHandler(entityId);
    }
  };

  const isEditing = entityId !== undefined && entityId !== null;
  const title = isEditing ? 'Edit Log' : 'New Log';

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

TimeLogAppBar.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  goBackHandler: PropTypes.func.isRequired,
  entityId: PropTypes.string,
  isConnecting: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
};

TimeLogAppBar.defaultProps = {
  entityId: undefined,
  isConnecting: false,
};

export default TimeLogAppBar;
