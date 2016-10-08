import React, { Component } from 'react';
import NavLink from './NavLink'

class MainNav extends Component {
  render() {
    return (
      <nav className="MainNav">
        <ul>
          <li>
            <NavLink to="/" onlyActiveOnIndex={true}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/projects">Projects</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default MainNav;
