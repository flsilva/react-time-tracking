const getNotifications = (messages, isConnecting) => {
  if (isConnecting) {
    return [{ detail: 'Connecting, please wait...' }];
  } else if (messages) {
    return messages;
  }

  return undefined;
};

// eslint-disable-next-line import/prefer-default-export
export { getNotifications };
