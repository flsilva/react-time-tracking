import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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

const hours = [];
for (let i = 0; i < 25; i += 1) {
  const label = i < 10 ? `0${i}` : i;
  hours.push(<MenuItem value={i} key={i} primaryText={label} />);
}

const minutes = [];
for (let i = 0; i < 60; i += 1) {
  const label = i < 10 ? `0${i}` : i;
  minutes.push(<MenuItem value={i} key={i} primaryText={label} />);
}

const TimeElapsed = props => (
  <div style={{ backgroundColor: '#3f2da5', paddingBottom: 20 }}>
    <div style={styles.container}>
      <div style={styles.container}>
        <DropDownMenu
          maxHeight={300}
          value={2}
          onChange={e => props.hourPicked(e.target.value)}
          iconStyle={{ display: 'none' }}
          menuItemStyle={{ fontSize: 40, padding: '20px 0' }}
          labelStyle={styles.num}
          underlineStyle={{ display: 'none' }}
        >
          {hours}
        </DropDownMenu>
      </div>
      <div style={styles.container}>
        <DropDownMenu
          maxHeight={300}
          value={27}
          onChange={e => props.minutePicked(e.target.value)}
          iconStyle={{ display: 'none' }}
          menuItemStyle={{ fontSize: 40, padding: '20px 0' }}
          labelStyle={styles.num}
          underlineStyle={{ display: 'none' }}
        >
          {minutes}
        </DropDownMenu>
      </div>
      <div style={styles.container}>
        <h1 style={styles.numSeconds}>12</h1>
      </div>
    </div>
  </div>
);

TimeElapsed.propTypes = {
  hourPicked: PropTypes.func.isRequired,
  minutePicked: PropTypes.func.isRequired,
};

TimeElapsed.defaultProps = {
  isPlaying: false,
};

export default TimeElapsed;
