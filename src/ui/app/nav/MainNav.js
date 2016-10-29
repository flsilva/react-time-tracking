import React from 'react'
import NavLink from '../../common/nav/NavLink'

const MainNav = (props) => {
  const signedInNav = () => (
    <ul>
      <li>
        <NavLink to="/app">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/app/projects">Projects</NavLink>
      </li>
      <li>
        <NavLink to="/sign-out">Sign Out</NavLink>
      </li>
    </ul>
  )

  const signedOutNav = () => (
    <ul>
      <li>
        <NavLink to="/sign-up">Sign Up</NavLink>
      </li>
      <li>
        <NavLink to="/sign-in">Sign In</NavLink>
      </li>
    </ul>
  )

  const nav = (props.user) ? signedInNav() : signedOutNav()

  return (
    <nav className="MainNav">
      {nav}
    </nav>
  )
}

export default MainNav

