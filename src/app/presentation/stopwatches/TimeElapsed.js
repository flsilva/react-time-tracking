import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberDropdown from '../common/NumberDropdown';

const styles = {
  container: {
    alignItems: 'baseline',
    display: 'flex',
    justifyContent: 'center',
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

class TimeElapsed extends Component {
  state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  /*
   * when we navigate between screens, getting stopwatch object from cache,
   * componentWillReceiveProps() is not invoked, but componentWillMount() is.
   */
  componentWillMount() {
    this.handleUpdate(this.props);
  }
  /**/

  /*
   * when we pick up an hour or minute we get an updated elapsedTime
   * via componentWillReceiveProps(), so we need to handle recalculation here.
   */
  componentWillReceiveProps(nextProps) {
    this.handleUpdate(nextProps);
  }
  /**/

  componentWillUnmount() {
    this.killInterval();
  }

  getTime = (startedAt, elapsedTime) => {
    const time = this.props.getElapsedTimeObject(startedAt, new Date(), elapsedTime);
    if (time.seconds < 10) time.seconds = `0${time.seconds}`;
    return time;
  }

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
    this.interval = undefined;
  }

  updateTime = (props) => {
    const { startedAt, elapsedTime } = props;
    const time = this.getTime(startedAt, elapsedTime);
    this.setState(time);
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.container}>
          <NumberDropdown
            prependZero
            maxHeight={300}
            onChange={this.props.onHourPick}
            startNum={0}
            endNum={24}
            value={this.state.hours}
          />
        </div>
        <div style={styles.container}>
          <NumberDropdown
            prependZero
            maxHeight={300}
            onChange={this.props.onMinutePick}
            startNum={0}
            endNum={59}
            value={this.state.minutes}
          />
        </div>
        <div style={styles.container}>
          <h1 style={styles.numSeconds}>{this.state.seconds}</h1>
        </div>
      </div>
    );
  }
}

TimeElapsed.propTypes = {
  onHourPick: PropTypes.func.isRequired,
  getElapsedTimeObject: PropTypes.func.isRequired,
  // isRunning is used from within handleUpdate()
  // eslint-disable-next-line react/no-unused-prop-types
  isRunning: PropTypes.bool,
  onMinutePick: PropTypes.func.isRequired,
  startedAt: PropTypes.instanceOf(Date),
  elapsedTime: PropTypes.number,
};

TimeElapsed.defaultProps = {
  isRunning: false,
  startedAt: undefined,
  elapsedTime: 0,
};

export default TimeElapsed;
