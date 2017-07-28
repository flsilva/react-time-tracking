import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { List, ListItem } from 'react-toolbox/lib/list';

const ProjectList = (props) => {
  const navigateToProject = (id) => {
    browserHistory.push(`/app/projects/${id}`);
  };

  const renderItem = (item) => {
    const { id, name } = item;

    return (
      <ListItem
        caption={name}
        key={id}
        leftIcon="folder"
        onClick={() => navigateToProject(id)}
        rightIcon="star"
      />
    );
  };

  return (
    <List selectable ripple>
      {props.data ? props.data.map(renderItem) : null}
    </List>
  );
};

ProjectList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ProjectList;
