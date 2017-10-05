import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import addSeconds from 'date-fns/add_seconds';
import differenceInSeconds from 'date-fns/difference_in_seconds';

const styles = {
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
};

const hourMenuItems = [];
for (let i = 0; i < 25; i += 1) {
  const label = i < 10 ? `0${i}` : i;
  hourMenuItems.push(<MenuItem value={i} key={i} primaryText={label} />);
}

const minuteMenuItems = [];
for (let i = 0; i < 60; i += 1) {
  const label = i < 10 ? `0${i}` : i;
  minuteMenuItems.push(<MenuItem value={i} key={i} primaryText={label} />);
}

class TimeElapsed extends Component {

  state = {
    hours: 0,
    minutes: 0,
    seconds: '00',
  }

  // componentWillMount() is needed because when we navigate between screens
  // and come back here, getting stopwatch data from cache, react doesn't invoke
  // componentWillReceiveProps(), but it does invoke componentWillMount().
  componentWillMount() {
    this.handleUpdate(this.props);
  }

  // componentWillReceiveProps() is needed because when we pick up
  // an hour or minute we get an updated activityTotalTime,
  // so we need to recalc hours and minutes.
  componentWillReceiveProps(nextProps) {
    this.handleUpdate(nextProps);
  }

  componentWillUnmount() {
    this.killInterval();
  }

  getTime = (startedAt, activityTotalTime) => {
    const totalElapsedSeconds = this.getTotalElapsedSeconds(startedAt, activityTotalTime);
    const hours = Math.floor(totalElapsedSeconds / 3600);
    const minutes = Math.floor(totalElapsedSeconds / 60) - (hours * 60);
    let seconds = totalElapsedSeconds - (minutes * 60) - (hours * 3600);
    if (seconds < 10) seconds = `0${seconds}`;

    return { hours, minutes, seconds };
  }

  getTotalElapsedSeconds = (startedAt, activityTotalTime) => (
    startedAt ?
      differenceInSeconds(addSeconds(new Date(), activityTotalTime), startedAt) : activityTotalTime
  );

  handleUpdate = (props) => {
    if (props.isRunning) {
      this.createInterval();
    } else {
      this.killInterval();
    }

    this.updateTime(props);
  }

  createInterval = () => {
    if (this.interval) return;
    this.interval = setInterval(() => this.updateTime(this.props), 1000);
  }

  killInterval = () => {
    clearInterval(this.interval);
    this.interval = null;
  }

  updateTime = (props) => {
    const { startedAt, activityTotalTime } = props;
    const time = this.getTime(startedAt, activityTotalTime);
    this.setState(time);
  }

  render() {
    return (
      <div>
        <div style={styles.container}>
          <div style={styles.container}>
            <DropDownMenu
              maxHeight={300}
              value={this.state.hours}
              onChange={(e, index, value) => this.props.onHourPick(value)}
              iconStyle={{ display: 'none' }}
              menuItemStyle={{ fontSize: 40, padding: '20px 0' }}
              labelStyle={styles.num}
              underlineStyle={{ display: 'none' }}
            >
              {hourMenuItems}
            </DropDownMenu>
          </div>
          <div style={styles.container}>
            <DropDownMenu
              maxHeight={300}
              value={this.state.minutes}
              onChange={(e, index, value) => this.props.onMinutePick(value)}
              iconStyle={{ display: 'none' }}
              menuItemStyle={{ fontSize: 40, padding: '20px 0' }}
              labelStyle={styles.num}
              underlineStyle={{ display: 'none' }}
            >
              {minuteMenuItems}
            </DropDownMenu>
          </div>
          <div style={styles.container}>
            <h1 style={styles.numSeconds}>{this.state.seconds}</h1>
          </div>
        </div>
      </div>
    );
  }
}

TimeElapsed.propTypes = {
  onHourPick: PropTypes.func.isRequired,
  isRunning: PropTypes.bool,
  onMinutePick: PropTypes.func.isRequired,
  startedAt: PropTypes.instanceOf(Date),
  activityTotalTime: PropTypes.number,
};

TimeElapsed.defaultProps = {
  isRunning: false,
  startedAt: null,
  activityTotalTime: 0,
};

export default TimeElapsed;
