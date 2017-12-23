import humps from 'humps';

// eslint-disable-next-line import/prefer-default-export
export const formatPayloadToApi = (payload) => {
  if (!payload) throw new Error('Argument <payload> must not be null.');
  return humps.decamelizeKeys(payload, { separator: '-' });
};
