import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { readEntities } from '../projects/ProjectActions';
import { getEntities } from '../projects/ProjectState';
import ProjectDropDown from '../../../ui/app/projects/ProjectDropDown';

class ProjectDropDownContainer extends Component {
  componentDidMount() {
    const query = this.props.getQuery ? this.props.getQuery() : undefined;
    this.props.actions.readEntities(query);
  }

  render() {
    return (
      <ProjectDropDown
        isConnecting={this.props.isConnecting}
        name={this.props.name}
        onCreateProjectClick={() => this.context.router.history.push('/app/projects/new')}
        onItemPick={this.props.onItemPick}
        projects={this.props.entities}
        selectedItemId={this.props.selectedItemId}
      />
    );
  }
}

ProjectDropDownContainer.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

ProjectDropDownContainer.propTypes = {
  actions: PropTypes.shape({
    readEntities: PropTypes.func.isRequired,
  }).isRequired,
  entities: PropTypes.arrayOf(PropTypes.object),
  getQuery: PropTypes.func,
  isConnecting: PropTypes.bool,
  name: PropTypes.string,
  onItemPick: PropTypes.func.isRequired,
  selectedItemId: PropTypes.string,
};

ProjectDropDownContainer.defaultProps = {
  entities: undefined,
  getQuery: undefined,
  isConnecting: false,
  name: undefined,
  selectedItemId: undefined,
};

const mapStateToProps = (state, { getQuery }) => {
  const query = getQuery ? getQuery() : undefined;
  const result = getEntities(state, query);
  const entities = result ? result.entities : undefined;

  return {
    entities,
    isConnecting: state.projects.isConnecting,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ readEntities }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectDropDownContainer);
