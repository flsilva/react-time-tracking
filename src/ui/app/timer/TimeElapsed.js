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

  componentWillReceiveProps(nextProps) {
    const { restartedAt, totalTime } = nextProps;

    if (nextProps.isRunning && !this.interval) {
      this.createInterval();
    } else if (!nextProps.isRunning) {
      this.killInterval();
      const time = this.getTime(restartedAt, totalTime);
      this.setState(time);
    }
  }

  componentWillUnmount() {
    this.killInterval();
  }

  getTime = (restartedAt, totalTime) => {
    const totalElapsedSeconds = this.getTotalElapsedSeconds(restartedAt, totalTime);
    const hours = Math.floor(totalElapsedSeconds / 3600);
    const minutes = Math.floor(totalElapsedSeconds / 60) - (hours * 60);
    let seconds = totalElapsedSeconds - (minutes * 60) - (hours * 3600);
    if (seconds < 10) seconds = `0${seconds}`;

    return { hours, minutes, seconds };
  }

  getTotalElapsedSeconds = (restartedAt, totalTime) => (
    restartedAt ?
      differenceInSeconds(addSeconds(new Date(), totalTime), restartedAt) : totalTime
  );

  createInterval = () => {
    this.interval = setInterval(this.updateTime, 1000);
  }

  killInterval = () => {
    clearInterval(this.interval);
    this.interval = null;
  }

  updateTime = () => {
    const { restartedAt, totalTime } = this.props;
    const time = this.getTime(restartedAt, totalTime);
    this.setState(time);
  }

  render() {
    return (
      <div style={{ backgroundColor: '#3f2da5', paddingBottom: 20 }}>
        <div style={styles.container}>
          <div style={styles.container}>
            <DropDownMenu
              maxHeight={300}
              value={this.state.hours}
              onChange={(e, index, value) => this.props.hourPicked(value)}
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
              onChange={(e, index, value) => this.props.minutePicked(value)}
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
  hourPicked: PropTypes.func.isRequired,
  isRunning: PropTypes.bool,
  minutePicked: PropTypes.func.isRequired,
  restartedAt: PropTypes.instanceOf(Date),
  totalTime: PropTypes.number,
};

TimeElapsed.defaultProps = {
  isRunning: false,
  restartedAt: null,
  totalTime: 0,
};

export default TimeElapsed;
