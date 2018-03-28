import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../../app/application/auth/AuthState';

class UserProvider extends Component {
  getChildContext() {
    return { user: this.props.user };
  }

  render() {
    return this.props.children;
  }
}

UserProvider.childContextTypes = {
  user: PropTypes.object,
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

UserProvider.defaultProps = {
  user: undefined,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(
  mapStateToProps,
)(UserProvider);
