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
    const { id, project } = item;

    return (
      <ListItem
        primaryText={project.name}
        key={id}
        leftAvatar={<Avatar>F</Avatar>}
        onClick={() => navigateToTimeLog(id)}
      />
    );
  };

  return (
    <List>
      {props.entities ? props.entities.map(renderItem) : undefined}
    </List>
  );
};

TimeLogList.propTypes = {
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ),
};

TimeLogList.defaultProps = {
  entities: null,
};

export default TimeLogList;
