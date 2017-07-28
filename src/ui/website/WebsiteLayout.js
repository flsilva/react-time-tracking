import React from 'react';
import PropTypes from 'prop-types';
import WebsiteHeader from './header/WebsiteHeader';

const WebsiteLayout = props => (
  <div className="WebsiteLayout">
    <WebsiteHeader user={props.auth.user} />
    <div className="SectionContainer">
      {props.children}
    </div>
    <p>
      website footer
    </p>
  </div>
);

WebsiteLayout.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  children: PropTypes.element.isRequired,
};

export default WebsiteLayout;
