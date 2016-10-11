import React, { Component, PropTypes } from 'react'

class ProjectForm extends Component {

  static propTypes = {
    heading: PropTypes.string.isRequired,
    title: PropTypes.string
  }

  state = {
    title: this.props.title || ''
  }

  changeHandler = e => {
    this.setState({ title: e.target.value })
  }

  saveHandler = e => {
    this.props.submitHandler(this.state.title)
    this.setState({ title: '' })
  }

  render() {
    return (
      <div className="ProjectForm">
        <h3>
          {this.props.heading}
        </h3>
        <input
          type="text"
          placeholder="Project name"
          autoFocus="true"
          value={this.state.title}
          onChange={this.changeHandler}
        />
        <button onClick={this.saveHandler}>Save</button>
      </div>
    )
  }
}

export default ProjectForm
