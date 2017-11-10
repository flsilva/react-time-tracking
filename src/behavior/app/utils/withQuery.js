import React from 'react';

export default getQuery => WrappedComponent => props => (
  <WrappedComponent getQuery={getQuery} {...props} />
);
