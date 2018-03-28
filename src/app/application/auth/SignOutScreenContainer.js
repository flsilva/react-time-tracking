import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SignOutActions from './sign-out/SignOutActions';

class SignOutScreenContainer extends Component {
  componentDidMount() {
    this.props.actions.signOut();
    this.props.history.push('/');
  }

  render() {
    return <div />;
  }
}

SignOutScreenContainer.propTypes = {
  actions: PropTypes.shape({
    signOut: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(SignOutActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignOutScreenContainer);
