import React from 'react'
import NavLink from '../../common/nav/NavLink'
import './MainNav.css'

const MainNav = (props) => {
  const signedInNav = () => (
    <ul>
      <li>
        <NavLink to="/app">Back to App</NavLink>
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
