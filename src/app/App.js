import React, { Component } from 'react'
import MainNav from '../components/main-nav/MainNav'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    console.log('App().render() - this: ', this)

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

export default App
