// eslint-disable-next-line import/prefer-default-export
export const getTimeObjectFromSeconds = (timeInSeconds) => {
  if (isNaN(timeInSeconds) || timeInSeconds < 0) {
    throw new Error(`Argument <timeInSeconds> must be a positive integer or zero. Got: ${timeInSeconds}`);
  }

  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
  const seconds = Math.floor(timeInSeconds - (hours * 3600) - (minutes * 60));

  return { hours, minutes, seconds };
};
