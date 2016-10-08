import React, { Component, PropTypes } from 'react'
import { addProject } from './Projects.actions'

class CreateProject extends Component {

  static propTypes = {
    title: PropTypes.string
  }

  state = {
    title: this.props.title || ''
  }

  changeHandler = e => {
    this.setState({ title: e.target.value })
  }

  saveHandler = e => {
    console.log('CreateProject().saveHandler()')
    addProject(this.state.title)
    this.setState({ title: '' })
  }

  render() {
    return (
      <div className="CreateProject">
        <h3>
          New Project
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

export default CreateProject
