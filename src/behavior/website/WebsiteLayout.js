import React from 'react';
import { connect } from 'react-redux';
import WebsiteLayout from '../../ui/website/WebsiteLayout';

const WebsiteLayoutContainer = props => (
  <WebsiteLayout {...props} />
);

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
)(WebsiteLayoutContainer);
