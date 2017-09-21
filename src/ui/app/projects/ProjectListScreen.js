import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppHeader from '../header/AppHeader';
import ProjectList from './ProjectList';

const fabStyles = {
  bottom: '20px',
  position: 'fixed',
  right: '20px',
};

const navToNewProject = () => {
  browserHistory.push('/app/projects/new');
};

const ProjectListScreen = props => (
  <div className="ProjectListScreen">
    <AppHeader title="Projects" user={props.user} />
    <ProjectList data={props.data} />
    {!props.isConnecting &&
      <FloatingActionButton style={fabStyles} onClick={navToNewProject}>
        <ContentAdd />
      </FloatingActionButton>
    }
  </div>
);

ProjectListScreen.propTypes = {
  isConnecting: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

ProjectListScreen.defaultProps = {
  data: null,
  isConnecting: false,
  user: null,
};

export default ProjectListScreen;
