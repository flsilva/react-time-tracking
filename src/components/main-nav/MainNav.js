import React from 'react'
import NavLink from './NavLink'

const MainNav = (props) => (
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
)

export default MainNav
