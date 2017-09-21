const getNotifications = (messages, isConnecting) => {
  if (isConnecting) {
    return [{ detail: 'Connecting, please wait...' }];
  } else if (messages) {
    return messages;
  }

  return null;
};

export { getNotifications };
