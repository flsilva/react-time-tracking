import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import TimeLogForm from './TimeLogForm';
import ArrowBackAppBar from '../header/ArrowBackAppBar';
import DoneIconButton from '../../common/DoneIconButton';
import MoreVertIconMenu from '../../common/MoreVertIconMenu';

const MENU_ITEM_DELETE = 'MENU_ITEM_DELETE';

class TimeLogFormScreen extends Component {
  backHandler = () => {
    browserHistory.goBack();
  }

  submitHandler = () => {
    this.timeLogForm.saveHandler();
  }

  iconMenuItemClickHandler = (event, child) => {
    if (child.props.value === MENU_ITEM_DELETE) {
      this.props.delete(this.props.timeLog.id);
    }
  }

  render() {
    const { isEditing, isConnecting, timeLog } = this.props;
    const title = isEditing ? 'Edit Log' : 'New Log';

    return (
      <div>
        <ArrowBackAppBar title={title} onClickBackButton={this.backHandler}>
          <ToolbarGroup lastChild>
            <DoneIconButton onClick={this.submitHandler} disabled={isConnecting} />
            {isEditing &&
              <MoreVertIconMenu onItemTouchTap={this.iconMenuItemClickHandler}>
                <MenuItem primaryText="Delete" value={MENU_ITEM_DELETE} />
              </MoreVertIconMenu>
            }
          </ToolbarGroup>
        </ArrowBackAppBar>
        <div>
          <TimeLogForm
            ref={(node) => { this.timeLogForm = node; }}
            isConnecting={isConnecting}
            timeLog={timeLog}
            submitHandler={this.props.submitHandler}
          />
        </div>
      </div>
    );
  }
}

TimeLogFormScreen.propTypes = {
  delete: PropTypes.func.isRequired,

  isEditing: PropTypes.bool,

  isConnecting: PropTypes.bool,

  timeLog: PropTypes.shape({
    id: PropTypes.string,
  }),

  submitHandler: PropTypes.func.isRequired,
};

TimeLogFormScreen.defaultProps = {
  isEditing: false,
  isConnecting: false,
  timeLog: null,
};

export default TimeLogFormScreen;
