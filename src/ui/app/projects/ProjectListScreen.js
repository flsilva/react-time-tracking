import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import SimpleAppBar from '../header/SimpleAppBar';
import ProjectList from './ProjectList';

const fabStyles = {
  bottom: '20px',
  position: 'fixed',
  right: '20px',
};

const ProjectListScreen = props => (
  <div>
    <SimpleAppBar title="Projects" />
    <ProjectList data={props.data} onClickProjectItem={props.onClickProjectItem} />
    {!props.isConnecting &&
      <FloatingActionButton style={fabStyles} onClick={props.onClickNewProject}>
        <ContentAddIcon />
      </FloatingActionButton>
    }
  </div>
);

ProjectListScreen.propTypes = {
  isConnecting: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  onClickNewProject: PropTypes.func.isRequired,
  onClickProjectItem: PropTypes.func.isRequired,
};

ProjectListScreen.defaultProps = {
  data: null,
  isConnecting: false,
};

export default ProjectListScreen;
