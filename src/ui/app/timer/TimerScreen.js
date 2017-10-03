import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import SimpleAppBar from '../header/SimpleAppBar';
import PlayPauseControls from './PlayPauseControls';
import TimeElapsed from './TimeElapsed';
import DatePicker from './DatePicker';
import ProjectListDropDown from './ProjectListDropDown';
import MoreVertIconMenu from '../common/MoreVertIconMenu';

const RESET_TIMER = 'app/timer/reset/requested';

class TimerScreen extends Component {

  iconMenuItemClickHandler = (event, child) => {
    if (child.props.value === RESET_TIMER) {
      this.props.resetStopwatch();
    }
  }

  render() {
    const data = this.props.data ? this.props.data : {};
    const { activityDate, activityTotalTime, isRunning, startedAt } = data;
    const projectId = data.project ? data.project.id : null;
    let descriptionButtonLabel = data.description ? data.description : 'Description (optional)';
    if (descriptionButtonLabel.length > 36) {
      descriptionButtonLabel = `${descriptionButtonLabel.substr(0, 36)} ...`;
    }

    return (
      <div>
        <SimpleAppBar title="Stopwatch">
          <ToolbarGroup lastChild>
            <MoreVertIconMenu onItemTouchTap={this.iconMenuItemClickHandler}>
              <MenuItem primaryText="Reset timer" value={RESET_TIMER} />
            </MoreVertIconMenu>
          </ToolbarGroup>
        </SimpleAppBar>
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
            isConnecting={this.props.projects.isConnecting}
            projects={this.props.projects.data}
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
              label="Save"
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
  projects: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    isConnecting: PropTypes.bool,
  }),
  submit: PropTypes.func.isRequired,
  descriptionClickHandler: PropTypes.func.isRequired,
  pauseStopwatch: PropTypes.func.isRequired,
  resetStopwatch: PropTypes.func.isRequired,
  startStopwatch: PropTypes.func.isRequired,
};

TimerScreen.defaultProps = {
  data: {},
  isConnecting: false,
  projects: {},
};

export default TimerScreen;
