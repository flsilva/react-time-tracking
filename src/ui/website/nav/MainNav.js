import React from 'react'
import { browserHistory } from 'react-router'
import Navigation from 'react-toolbox/lib/navigation'
import NavLink from '../../common/nav/NavLink'
import './MainNav.css'

const MainNav = (props) => {
  const navigateToSignUp = () => {
    browserHistory.push('/sign-up')
  }

  const navigateToSignIn = () => {
    browserHistory.push('/sign-in')
  }

  const signedInLinks = () => (
    [
      { label: 'Back to App', flat: true, icon: 'keyboard_arrow_left', href: '/app' }
    ]
  )

  const signedOutLinks = () => (
    [
      { label: 'Sign Up', flat: true, onMouseUp: navigateToSignUp },
      { label: 'Sign In', flat: true, onMouseUp: navigateToSignIn }
    ]
  )

  const links = (props.user) ? signedInLinks() : signedOutLinks()

  return (
    <Navigation type='vertical' actions={links} />
  )
}

export default MainNav
