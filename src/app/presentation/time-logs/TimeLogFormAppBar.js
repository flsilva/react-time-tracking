import React from 'react';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import { ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import ArrowBackAppBar from '../header/ArrowBackAppBar';
import DoneIconButton from '../../../shared/presentation/DoneIconButton';
import MoreVertIconMenu from '../../../shared/presentation/MoreVertIconMenu';

const MENU_ITEM_DELETE = 'MENU_ITEM_DELETE';

const TimeLogAppBar = (props) => {
  const { entityId, goBackHandler, deleteHandler, isConnecting, submitHandler } = props;

  const iconMenuItemClickHandler = (event, child) => {
    if (child.props.value === MENU_ITEM_DELETE) {
      deleteHandler(entityId);
    }
  };

  const isEditing = isString(entityId);
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
