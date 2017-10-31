import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const ProjectList = ({ data, onClickProjectItem }) => {
  const renderItem = (item, onClick) => {
    const { id, name } = item;

    return (
      <ListItem
        primaryText={name}
        key={id}
        leftAvatar={<Avatar>F</Avatar>}
        onClick={() => onClick(id)}
      />
    );
  };

  return (
    <List>
      {data ? data.map(item => renderItem(item, onClickProjectItem)) : undefined}
    </List>
  );
};

ProjectList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  onClickProjectItem: PropTypes.func.isRequired,
};

ProjectList.defaultProps = {
  data: null,
};

export default ProjectList;
