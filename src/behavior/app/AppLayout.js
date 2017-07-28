import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '../../ui/app/AppLayout';

const AppLayoutContainer = props => (
  <AppLayout {...props} />
);

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
)(AppLayoutContainer);
