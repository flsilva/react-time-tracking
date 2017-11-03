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

export const changeElapsedHours = (start, hours, offset = 0) => {
  const now = new Date();
  const currentHours = getElapsedHours(start, now, offset);
  return offset + ((hours - currentHours) * 3600);
};

export const changeElapsedMinutes = (start, minutes, offset = 0) => {
  const now = new Date();
  const currentMinutes = getElapsedMinutes(start, now, offset);
  return offset + ((minutes - currentMinutes) * 60);
};
