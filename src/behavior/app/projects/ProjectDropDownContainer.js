import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { readEntities } from '../projects/ProjectActions';
import { getEntities } from '../projects/ProjectState';
import ProjectDropDown from '../../../ui/app/projects/ProjectDropDown';

class ProjectDropDownContainer extends Component {
  componentDidMount() {
    this.props.actions.readEntities();
  }

  render() {
    return (
      <ProjectDropDown
        isConnecting={this.props.isConnecting}
        onCreateProjectClick={() => browserHistory.push('/app/projects/new')}
        onItemPick={this.props.onItemPick}
        projects={this.props.entities}
        selectedItemId={this.props.selectedItemId}
      />
    );
  }
}

ProjectDropDownContainer.propTypes = {
  actions: PropTypes.shape({
    readEntities: PropTypes.func.isRequired,
  }).isRequired,
  entities: PropTypes.arrayOf(PropTypes.object),
  isConnecting: PropTypes.bool,
  onItemPick: PropTypes.func.isRequired,
  selectedItemId: PropTypes.string,
};

ProjectDropDownContainer.defaultProps = {
  entities: undefined,
  isConnecting: false,
  selectedItemId: undefined,
};

const mapStateToProps = state => ({
  entities: getEntities(state),
  isConnecting: state.projects.isConnecting,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ readEntities }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectDropDownContainer);
