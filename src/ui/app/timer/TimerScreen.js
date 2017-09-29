import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
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
    console.log('TimerScreen().render() - data: ', data);
    const { activityDate, activityTotalTime, isRunning, startedAt } = data;
    const projectId = data.project ? data.project.id : null;
    let descriptionButtonLabel = data.description ? data.description : 'Description (optional)';
    if (descriptionButtonLabel.length > 36) {
      descriptionButtonLabel = descriptionButtonLabel.substr(0, 36) + '...';
    }
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
        <div
          style={{
            alignItems: 'center',
            backgroundColor: '#3f2da5',
            display: 'flex',
            justifyContent: 'center',
            height: 125,
            paddingTop: 10,
          }}
        >
          {this.props.isConnecting ?
            <CircularProgress color={'rgb(0, 188, 212)'} size={50} thickness={4} />
            : <PlayPauseControls
              isRunning={isRunning}
              pause={this.props.pauseStopwatch}
              start={this.props.startStopwatch}
            />
          }
        </div>
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
            <FlatButton
              label={descriptionButtonLabel}
              onClick={this.props.descriptionClickHandler}
              style={{
                borderBottom: '1px solid rgb(179, 179, 179)',
                borderRadius: 0,
                display: 'flex',
                flexGrow: 1,
                textAlign: 'left',
              }}
              labelStyle={{
                color: 'rgb(179, 179, 179)',
                fontSize: 16,
                fontWeight: 300,
                padding: 0,
                textTransform: 'none',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 20,
            }}
          >
            <RaisedButton
              disabled={this.props.isConnecting}
              label="Finalize"
              primary
              onClick={this.props.submit}
            />
          </div>
        </div>
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
  isConnecting: PropTypes.bool,
  datePicked: PropTypes.func.isRequired,
  hourPicked: PropTypes.func.isRequired,
  minutePicked: PropTypes.func.isRequired,
  projectPicked: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
  submit: PropTypes.func.isRequired,
  descriptionClickHandler: PropTypes.func.isRequired,
  pauseStopwatch: PropTypes.func.isRequired,
  startStopwatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

TimerScreen.defaultProps = {
  data: {},
  isConnecting: false,
  projects: null,
  user: null,
};

export default TimerScreen;
