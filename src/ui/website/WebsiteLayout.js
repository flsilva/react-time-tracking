import React from 'react';
import PropTypes from 'prop-types';
import WebsiteHeader from './header/WebsiteHeader';

const WebsiteLayout = props => (
  <div>
    <WebsiteHeader title="OpenTracker" />
    <div>
      {props.children}
    </div>
    <div>
      <p>
        website footer
      </p>
    </div>
  </div>
);

WebsiteLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default WebsiteLayout;
