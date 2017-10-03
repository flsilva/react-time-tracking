import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppLayout from '../../ui/app/AppLayout';

class AppLayoutContainer extends Component {
  state = { user: null };

  getChildContext() {
    return { user: this.props.user };
  }

  render() {
    return (
      <AppLayout>
        {this.props.children}
      </AppLayout>
    );
  }
}

AppLayoutContainer.childContextTypes = {
  user: PropTypes.object,
};

AppLayoutContainer.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

AppLayoutContainer.defaultProps = {
  user: null,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
)(AppLayoutContainer);
