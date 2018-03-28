import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIconMenu from '../../../shared/presentation/MoreVertIconMenu';
import SimpleAppBar from '../header/SimpleAppBar';

const RESET_TIMER = './stopwatches/reset/requested';

const StopwatchAppBar = (props) => {
  const iconMenuItemClickHandler = (event, child) => {
    if (child.props.value === RESET_TIMER) {
      props.resetStopwatch();
    }
  };

  return (
    <SimpleAppBar title="Stopwatch">
      <ToolbarGroup lastChild>
        <MoreVertIconMenu onItemTouchTap={iconMenuItemClickHandler}>
          <MenuItem primaryText="Reset stopwatch" value={RESET_TIMER} />
        </MoreVertIconMenu>
      </ToolbarGroup>
    </SimpleAppBar>
  );
};

StopwatchAppBar.propTypes = {
  resetStopwatch: PropTypes.func.isRequired,
};

export default StopwatchAppBar;
