import React from 'react';
import { getNavigator } from './';

export default WrappedComponent => props => (
  <WrappedComponent navBack={getNavigator().goBack} {...props} />
);
