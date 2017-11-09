import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class ProjectForm extends Component {

  state = {
    name: (this.props.project && this.props.project.name) ? this.props.project.name : '',
  }

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.project) return;

    this.setState({
      name: nextProps.project.name,
    });
  }

  changeHandler = (e) => {
    this.setState({ name: e.target.value });
  }

  saveHandler = () => {
    const data = {
      name: this.state.name,
    };

    this.props.submitHandler(data);
  }

  render() {
    return (
      <div className="ProjectForm">
        <TextField
          hintText="Project name"
          onChange={this.changeHandler}
          type="text"
          value={this.state.name}
        />
        {this.props.project && this.props.project.author &&
          <p>Author: {this.props.project.author.email}</p>
        }
      </div>
    );
  }
}

ProjectForm.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    author: PropTypes.shape({
      email: PropTypes.string,
    }),
  }),
  submitHandler: PropTypes.func.isRequired,
};

ProjectForm.defaultProps = {
  project: undefined,
};

export default ProjectForm;
