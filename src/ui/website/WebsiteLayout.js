import React from 'react';
import PropTypes from 'prop-types';
import WebsiteHeader from './header/WebsiteHeader';

const WebsiteLayout = props => (
  <div className="WebsiteLayout">
    <WebsiteHeader title="OpenTracker" />
    <div className="SectionContainer">
      {props.children}
    </div>
    <p>
      website footer
    </p>
  </div>
);

WebsiteLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default WebsiteLayout;
