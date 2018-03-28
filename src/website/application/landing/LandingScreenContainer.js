import { connect } from 'react-redux';
import LandingScreen from '../../presentation/landing/LandingScreen';

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
)(LandingScreen);
