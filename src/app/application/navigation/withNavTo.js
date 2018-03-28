import React from 'react';
import { getNavTo } from './';

export default WrappedComponent => props => (
  <WrappedComponent navTo={getNavTo()} {...props} />
);
