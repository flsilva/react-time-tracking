import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TextField from 'material-ui/TextField';
import MainNav from '../nav/MainNav';
import PlayPauseControls from './PlayPauseControls';
import TimeElapsed from './TimeElapsed';
import DatePicker from './DatePicker';
import ProjectListDropDown from './ProjectListDropDown';

const RESET_TIMER = 'app/timer/reset/requested';

class TimerScreen extends Component {

  state = {
    menuActive: false,
  }

  toggleMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }

  iconMenuItemClickHandler = (event, child) => {
    if (child.props.value === RESET_TIMER) {
      console.log('TimerScreen().iconMenuItemClickHandler() - RESET TIMER');
    }
  }

  render() {
    const { palette } = this.context.muiTheme;
    const data = this.props.data ? this.props.data : {};
    const { activityDate, activityTotalTime, isRunning, startedAt } = data;
    const projectId = data.project ? data.project.id : null;
    const toolbarStyles = {
      backgroundColor: palette.primary1Color,
      boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
    };

    return (
      <div className="TimerScreen">
        <Toolbar style={toolbarStyles}>
          <ToolbarGroup firstChild>
            <IconButton onClick={this.toggleMenu}>
              <FontIcon
                className="material-icons"
                color={palette.alternateTextColor}
              >
                menu
              </FontIcon>
            </IconButton>
            <ToolbarTitle
              text="Timer"
              style={{ color: palette.alternateTextColor }}
            />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              iconStyle={{ color: palette.alternateTextColor }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              onItemTouchTap={this.iconMenuItemClickHandler}
            >
              <MenuItem primaryText="Reset timer" value={RESET_TIMER} />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
        <Drawer
          docked={false}
          open={this.state.menuActive}
          onRequestChange={this.toggleMenu}
        >
          <MainNav user={this.props.user} />
        </Drawer>
        <PlayPauseControls
          isRunning={isRunning}
          pause={this.props.pauseStopwatch}
          start={this.props.startStopwatch}
        />
        <TimeElapsed
          hourPicked={this.props.hourPicked}
          isRunning={isRunning}
          minutePicked={this.props.minutePicked}
          startedAt={startedAt}
          activityTotalTime={activityTotalTime}
        />
        <div style={{ margin: 10 }}>
          <DatePicker
            date={activityDate}
            datePicked={this.props.datePicked}
          />
          <ProjectListDropDown
            itemPicked={this.props.projectPicked}
            projects={this.props.projects}
            selectedItem={projectId}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon
              color="#3f2da5"
              style={{ marginRight: 20 }}
            />
            <TextField
              hintText="Description (optional)"
              multiLine
              rowsMax={4}
            />
          </div>
        </div>
        <RaisedButton
          label="Finalize"
          primary
          onClick={this.props.submit}
          style={{ position: 'fixed', bottom: 10, right: 10 }}
        />
      </div>
    );
  }
}

TimerScreen.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

TimerScreen.propTypes = {
  data: PropTypes.shape({
    activityDate: PropTypes.instanceOf(Date),
    activityTotalTime: PropTypes.number,
    isRunning: PropTypes.bool,
    projectId: PropTypes.string,
    startedAt: PropTypes.instanceOf(Date),
  }),
  datePicked: PropTypes.func.isRequired,
  hourPicked: PropTypes.func.isRequired,
  minutePicked: PropTypes.func.isRequired,
  projectPicked: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
  submit: PropTypes.func.isRequired,
  pauseStopwatch: PropTypes.func.isRequired,
  startStopwatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

TimerScreen.defaultProps = {
  data: {},
  projects: null,
  user: null,
};

export default TimerScreen;
