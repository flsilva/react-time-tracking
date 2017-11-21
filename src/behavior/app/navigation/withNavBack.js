import React from 'react';
import { getNavBack } from './';

export default WrappedComponent => props => (
  <WrappedComponent navBack={getNavBack()} {...props} />
);
