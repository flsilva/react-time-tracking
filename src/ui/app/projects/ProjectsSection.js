import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppHeader from '../header/AppHeader';
import ProjectList from './ProjectList';

const fabStyles = {
  bottom: '20px',
  position: 'absolute',
  right: '20px',
};

const navToNewProject = () => {
  browserHistory.push('/app/projects/new');
};

const ProjectsSection = props => (
  <div className="ProjectsSection">
    <AppHeader title="Projects" user={props.user} />
    <ProjectList data={props.projects} />
    <FloatingActionButton style={fabStyles} onClick={navToNewProject}>
      <ContentAdd />
    </FloatingActionButton>
  </div>
);

ProjectsSection.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

ProjectsSection.defaultProps = {
  projects: null,
  user: null,
};

export default ProjectsSection;
