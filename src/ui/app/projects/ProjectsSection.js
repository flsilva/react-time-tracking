import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppHeader from '../header/AppHeader';
import ProjectList from './ProjectList';
import ErrorMessages from '../error/ErrorMessages';

const ProjectsSection = (props) => {
  const navToNewProject = () => {
    browserHistory.push('/app/projects/new');
  };

  return (
    <div className="ProjectsSection">
      <AppHeader title="Projects" user={props.user} />
      <ProjectList data={props.projects} />
      <FloatingActionButton onClick={navToNewProject}>
        <ContentAdd />
      </FloatingActionButton>
      <ErrorMessages error={props.error} />
    </div>
  );
};

ProjectsSection.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  projects: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

ProjectsSection.defaultProps = {
  error: null,
  projects: null,
  user: null,
};

export default ProjectsSection;
