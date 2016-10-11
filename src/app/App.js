import React from 'react'
import MainNav from '../components/main-nav/MainNav'
import logo from './logo.svg'
import './App.css'

const App = (props) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <MainNav/>
    <div className="SectionContainer">
      {React.cloneElement(props.children, props)}
    </div>
  </div>
)

App.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default App
