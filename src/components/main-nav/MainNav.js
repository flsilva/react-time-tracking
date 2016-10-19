import React from 'react'
import NavLink from './NavLink'

const MainNav = (props) => (
  <nav className="MainNav">
    <ul>
      <li>
        <NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/sign-up">Sign Up</NavLink>
      </li>
      <li>
        <NavLink to="/app">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/app/projects">Projects</NavLink>
      </li>
    </ul>
  </nav>
)

export default MainNav
