import React, { Component } from 'react';
import MainNav from './main-nav/MainNav'
import logo from './logo.svg';
import './App.css';

class AppContainer extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <MainNav/>
        <div className="SectionContainer">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AppContainer;
