import React, { Component } from 'react'
import MainNav from './main-nav/MainNav'
import logo from './logo.svg'
import './App.css'

class AppComponent extends Component {
  render() {
    console.log('AppComponent().render() - this: ', this)

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <MainNav/>
        <div className="SectionContainer">
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    )
  }
}

export default AppComponent
