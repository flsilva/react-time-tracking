import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as AuthActions from './Auth.Actions'

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
})

class SignUpSectionContainer extends Component {
  componentDidMount() {
    this.props.actions.emailSignOut()
      browserHistory.push('/')
  }

  render() {
    return <div />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpSectionContainer)

