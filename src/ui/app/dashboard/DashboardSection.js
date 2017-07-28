import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from '../header/AppHeader';

const DashboardSection = props => (
  <div className="DashboardSection">
    <AppHeader title="Dashboard" user={props.user} />
    <p>
      Dashboard section
    </p>
  </div>
);

DashboardSection.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

DashboardSection.defaultProps = {
  user: null,
};

export default DashboardSection;
