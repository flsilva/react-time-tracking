import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

const ProjectList = (props) => {
  const navigateToProject = (id) => {
    browserHistory.push(`/app/projects/${id}`);
  };

  const renderItem = (item) => {
    const { id, name } = item;

    return (
      <ListItem
        primaryText={name}
        key={id}
        leftIcon={<FontIcon className="folder" />}
        onClick={() => navigateToProject(id)}
        rightIcon={<FontIcon className="star" />}
      />
    );
  };

  return (
    <List>
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
  ),
};

ProjectList.defaultProps = {
  data: null,
};

export default ProjectList;
