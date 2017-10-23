import React from 'react';

const withIcon = (Component, Icon) => () => (
  <div style={{ alignItems: 'center', display: 'flex', height: 48 }}>
    <div style={{ alignItems: 'center', display: 'flex', marginRight: 20 }}>
      <Icon />
    </div>
    <Component />
  </div>
);

export default withIcon;
