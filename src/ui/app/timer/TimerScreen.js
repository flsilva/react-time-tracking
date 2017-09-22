import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PlayIcon from 'material-ui/svg-icons/av/play-circle-filled';
import PauseIcon from 'material-ui/svg-icons/av/pause-circle-filled';
import FontIcon from 'material-ui/FontIcon';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import format from 'date-fns/format';
import isYesterday from 'date-fns/is_yesterday';
import isToday from 'date-fns/is_today';
import isTomorrow from 'date-fns/is_tomorrow';
import MainNav from '../nav/MainNav';

const RESET_TIMER = 'app/timer/reset/requested';

const fabStyles = {
  position: 'fixed',
  right: 16,
  top: 240,
};

const submitLog = () => {
};

class TimerScreen extends Component {

  state = {
    menuActive: false,
    isPlaying: false,
  }

  toggleMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }

  togglePlay = () => {
    console.log('TimerScreen().togglePlay()');
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  iconMenuItemClickHandler = (event, child) => {
    if (child.props.value === RESET_TIMER) {
      console.log('TimerScreen().iconMenuItemClickHandler() - RESET TIMER');
    }
  }

  submit = () => {
    console.log('TimerScreen().submit()');
  }

  render() {
    const { palette } = this.context.muiTheme;
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
        <PlayPauseControls isPlaying={this.state.isPlaying} togglePlay={this.togglePlay} />
        <TimeTracked />
        <div style={{ margin: 10 }}>
          <LogDatePicker />
          <ProjectListDropDown />
          <LogDescription />
        </div>
        {/*
        <FloatingActionButton style={fabStyles} onClick={this.submit}>
          <ContentAdd />
        </FloatingActionButton>*/}
        <FlatButton
          label="Save"
          primary
          onClick={this.submit}
          style={{ position: 'fixed', bottom: 10, right: 0 }}
        />
      </div>
    );
  }
}

TimerScreen.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

TimerScreen.contextTypes = {
  muiTheme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

TimerScreen.defaultProps = {
  user: null,
};

const timeTrackedStyles = {
  container: {
    alignItems: 'baseline',
    display: 'flex',
    justifyContent: 'center',
  },
  num: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 50,
    fontWeight: 300,
    margin: 0,
    padding: '5px 12px',
  },
  numSeconds: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 400,
    margin: 0,
    padding: '5px 12px',
  },
  letter: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 16,
    textAlign: 'center',
    margin: 0,
    marginLeft: 5,
    // marginTop: -6,
    // textTransform: 'uppercase',
  },
  seconds: {
    fontFamily: 'Roboto',
    fontSize: 16,
  },
};

const PlayPauseControls = props => (
  <div style={{ backgroundColor: '#3f2da5', display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
    <IconButton
      onClick={props.togglePlay}
      iconStyle={{ color: "rgb(0, 188, 212)", height: 100, width: 100 }}
      style={{ height: 125, width: 125 }}
    >
      {props.isPlaying ? <PauseIcon /> : <PlayIcon />}
    </IconButton>
  </div>
);

const hours = [];
for (let i = 0; i < 25; i++) {
  const label = i < 10 ? `0${i}` : i;
  hours.push(<MenuItem value={i} key={i} primaryText={label} />);
}

const minutes = [];
for (let i = 0; i < 60; i++) {
  const label = i < 10 ? `0${i}` : i;
  minutes.push(<MenuItem value={i} key={i} primaryText={label} />);
}

console.log('minutes.length', minutes.length);

const TimeTracked = props => (
  <div style={{ backgroundColor: '#3f2da5', paddingBottom: 20 }}>
    <div style={timeTrackedStyles.container}>
      <div style={timeTrackedStyles.container}>
        {/*<h1 style={timeTrackedStyles.num}>02</h1>*/}
        <DropDownMenu
          maxHeight={300}
          value={2}
          onChange={this.handleChange}
          iconStyle={{ display: 'none' }}
          menuItemStyle={{ fontSize: 40, padding: '20px 0' }}
          labelStyle={timeTrackedStyles.num}
          underlineStyle={{ display: 'none' }}
        >
          {hours}
        </DropDownMenu>
      </div>
      <div style={timeTrackedStyles.container}>
        {/*<h1 style={timeTrackedStyles.num}>27</h1>*/}
        <DropDownMenu
          maxHeight={300}
          value={27}
          onChange={this.handleChange}
          iconStyle={{ display: 'none' }}
          menuItemStyle={{ fontSize: 40, padding: '20px 0' }}
          labelStyle={timeTrackedStyles.num}
          underlineStyle={{ display: 'none' }}
        >
          {minutes}
        </DropDownMenu>
      </div>
      <div style={timeTrackedStyles.container}>
        <h1 style={timeTrackedStyles.numSeconds}>12</h1>
      </div>
    </div>
  </div>
);

const items = [];
for (let i = 0; i < 100; i++ ) {
  items.push(<MenuItem value={i} key={i} primaryText={`Awesome Super Project ${i}`} />);
}

class ProjectListDropDown extends Component {

  state = { value: 10 };

  handleChange = (event, index, value) => this.setState({ value });

  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FontIcon
          className="material-icons"
          style={{ marginRight: 20, marginTop: 2 }}
        >
          work
        </FontIcon>
        <DropDownMenu
          maxHeight={200}
          value={this.state.value}
          onChange={this.handleChange}
          labelStyle={{ paddingLeft: 0 }}
          underlineStyle={{ display: 'none' }}
        >
          {items}
        </DropDownMenu>
      </div>
    );
  }
}

class LogDatePicker extends Component {

  state = { date: new Date() };

  handleChange = (event, date) => {
    this.setState({ date });
  };

  formatDate = (date) => {
    console.log('LogDatePicker().formatDate() - date: ', date);
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    if (isTomorrow(date)) return 'Tomorrow';

    return format(date, 'MMM Do');
  }

  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FontIcon
          className="material-icons"
          style={{ marginRight: 20 }}
        >
          insert_invitation
        </FontIcon>
        <DatePicker
          autoOk
          hintText="Select a date to log to"
          value={this.state.date}
          onChange={this.handleChange}
          formatDate={this.formatDate}
          textFieldStyle={{ width: 105 }}
          underlineStyle={{ display: 'none' }}
        />
      </div>
    );
  }
}

const LogDescription = (props) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <FontIcon
      className="material-icons"
      style={{ marginRight: 20 }}
    >
      description
    </FontIcon>
    <TextField
      hintText="Description (optional)"
      multiLine
      rowsMax={4}
    />
  </div>
);

export default TimerScreen;
