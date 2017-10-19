import addSeconds from 'date-fns/add_seconds';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import isDate from 'date-fns/is_date';

export const getElapsedTimeInSeconds = (start, end, offset = 0) => {
  if (isDate(start) && !isDate(end)) {
    throw new Error('Argument <end> must not be null when providing argument <start>.');
  }

  return start ? differenceInSeconds(addSeconds(end, offset), start) : offset;
};

export const getElapsedHours = (start, end, offset = 0) => (
  Math.floor(getElapsedTimeInSeconds(start, end, offset) / 3600)
);

export const getElapsedMinutes = (start, end, offset = 0) => {
  const elapsedTimeInSeconds = Math.floor(getElapsedTimeInSeconds(start, end, offset));
  const elapsedHours = getElapsedHours(start, end, offset);
  return Math.floor(elapsedTimeInSeconds / 60) - (elapsedHours * 60);
};

export const getElapsedSeconds = (start, end, offset = 0) => {
  const elapsedTimeInSeconds = getElapsedTimeInSeconds(start, end, offset);
  const elapsedHours = getElapsedHours(start, end, offset);
  const elapsedMinutes = getElapsedMinutes(start, end, offset);

  return elapsedTimeInSeconds - (elapsedMinutes * 60) - (elapsedHours * 3600);
};

export const getElapsedTimeObject = (start, end, offset = 0) => {
  const hours = getElapsedHours(start, end, offset);
  const minutes = getElapsedMinutes(start, end, offset);
  const seconds = getElapsedSeconds(start, end, offset);

  return { hours, minutes, seconds };
};

export const changeElapsedHours = (timeInSeconds, hours) => {
  const currentHours = Math.floor(timeInSeconds / 3600);
  return timeInSeconds + ((hours - currentHours) * 3600);
};

export const changeElapsedMinutes = (timeInSeconds, minutes) => {
  const currentHours = Math.floor(timeInSeconds / 3600);
  const currentMinutes = Math.floor(timeInSeconds / 60) - (currentHours * 60);
  return timeInSeconds + ((minutes - currentMinutes) * 60);
};
