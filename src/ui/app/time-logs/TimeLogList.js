import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const TimeLogList = ({ entities, onClickItem }) => {
  const renderItem = (item, onClick) => {
    const { id, project } = item;

    return (
      <ListItem
        primaryText={project.name}
        key={id}
        leftAvatar={<Avatar>F</Avatar>}
        onClick={() => onClick(id)}
      />
    );
  };

  return (
    <List>
      {entities ? entities.map(item => renderItem(item, onClickItem)) : undefined}
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
  onClickItem: PropTypes.func.isRequired,
};

TimeLogList.defaultProps = {
  entities: undefined,
};

export default TimeLogList;
