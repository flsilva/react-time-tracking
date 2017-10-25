import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  icon: { display: 'none' },
  label: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 50,
    fontWeight: 300,
    margin: 0,
    padding: '5px 12px',
  },
  menuItem: {
    fontSize: 40,
    padding: '20px 0',
  },
  underline: { display: 'none' },
};

const createItems = (start, end, prependZero) => {
  const items = [];

  for (let i = start; i <= end; i += 1) {
    let label = i;
    if (prependZero && i < 10) label = `0${label}`;
    items.push(<MenuItem value={i} key={i} primaryText={label} />);
  }

  return items;
};

const NumberDropDown = (props) => {
  const { endNum, maxHeight, onChange, prependZero, startNum, value } = props;

  return (
    <DropDownMenu
      maxHeight={maxHeight}
      value={value}
      onChange={(e, index, newValue) => onChange(newValue)}
      iconStyle={styles.icon}
      menuItemStyle={styles.menuItem}
      labelStyle={styles.label}
      underlineStyle={styles.underline}
    >
      {createItems(startNum, endNum, prependZero)}
    </DropDownMenu>
  );
};

NumberDropDown.propTypes = {
  endNum: PropTypes.number.isRequired,
  maxHeight: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  prependZero: PropTypes.bool,
  startNum: PropTypes.number.isRequired,
  value: PropTypes.number,
};

NumberDropDown.defaultProps = {
  maxHeight: 100,
  prependZero: false,
  value: undefined,
};

export default NumberDropDown;
