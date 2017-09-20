const getNotifications = (messages, isFetching) => {
  if (isFetching) {
    return [{ detail: 'Connecting, please wait...' }];
  } else if (messages) {
    return messages;
  }

  return null;
};

export { getNotifications };
