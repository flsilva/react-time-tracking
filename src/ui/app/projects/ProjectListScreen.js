import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import SimpleAppBar from '../header/SimpleAppBar';
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
  <div>
    <SimpleAppBar title="Projects" />
    <ProjectList data={props.data} />
    {!props.isConnecting &&
      <FloatingActionButton style={fabStyles} onClick={navToNewProject}>
        <ContentAddIcon />
      </FloatingActionButton>
    }
  </div>
);

ProjectListScreen.propTypes = {
  isConnecting: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
};

ProjectListScreen.defaultProps = {
  data: null,
  isConnecting: false,
};

export default ProjectListScreen;
