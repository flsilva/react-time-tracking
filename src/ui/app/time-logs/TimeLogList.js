import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const TimeLogList = (props) => {
  const navigateToTimeLog = (id) => {
    browserHistory.push(`/app/time-logs/${id}`);
  };

  const renderItem = (item) => {
    const { id, name } = item;

    return (
      <ListItem
        primaryText={name}
        key={id}
        leftAvatar={<Avatar>F</Avatar>}
        onClick={() => navigateToTimeLog(id)}
      />
    );
  };

  return (
    <List>
      {props.data ? props.data.map(renderItem) : null}
    </List>
  );
};

TimeLogList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};

TimeLogList.defaultProps = {
  data: null,
};

export default TimeLogList;
