import addSeconds from 'date-fns/add_seconds';
import addMinutes from 'date-fns/add_minutes';
import subMinutes from 'date-fns/sub_minutes';
import differenceInSeconds from 'date-fns/difference_in_seconds';

export const PICK_DATE = 'app/timer/pick/date/requested';
export const PICK_HOUR = 'app/timer/pick/hour/requested';
export const PICK_MINUTE = 'app/timer/pick/minute/requested';
export const PICK_PROJECT = 'app/timer/pick/project/requested';
export const TOGGLE = 'app/timer/toggle/requested';
export const UPDATE_DATABASE = 'app/timer/update/database';

const getTotalElapsedSeconds = (restartedAt, totalTime) => {
  console.log('getTotalElapsedSeconds() - totalTime: ', totalTime);
  return restartedAt ?
      differenceInSeconds(addSeconds(new Date(), totalTime), restartedAt) : totalTime;
};

const getTime = (restartedAt, totalTime) => {
  const totalElapsedSeconds = getTotalElapsedSeconds(restartedAt, totalTime);
  const hours = Math.floor(totalElapsedSeconds / 3600);
  const minutes = Math.floor(totalElapsedSeconds / 60) - (hours * 60);
  let seconds = totalElapsedSeconds - (minutes * 60) - (hours * 3600);
  if (seconds < 10) seconds = `0${seconds}`;

  return { hours, minutes, seconds };
};

const updateDatabase = payload => ({ type: UPDATE_DATABASE, payload });

export const pickDate = () => ({ type: PICK_DATE });
// export const pickHour = () => ({ type: PICK_HOUR });
export const pickHour = hours => (dispatch, getState) => {
  const data = { ...getState().timer.data };
  if (!data.totalTime) data.totalTime = 0;

  const currentHours = getTime(data.restartedAt, data.totalTime).hours;

  if (hours === currentHours) return;

  if (hours > currentHours) {
    data.totalTime += (hours - currentHours) * 3600;
  } else {
    data.totalTime -= (currentHours - hours) * 3600;
  }

  dispatch(updateDatabase(data));
};
// export const pickMinute = () => ({ type: PICK_MINUTE });

export const pickMinute = minutes => (dispatch, getState) => {
  const data = { ...getState().timer.data };
  if (!data.totalTime) data.totalTime = 0;

  const currentMinutes = getTime(data.restartedAt, data.totalTime).minutes;

  if (minutes === currentMinutes) return;

  if (minutes > currentMinutes) {
    data.totalTime += (minutes - currentMinutes) * 60;
  } else {
    data.totalTime -= (currentMinutes - minutes) * 60;
  }

  dispatch(updateDatabase(data));
};

export const pickProject = () => ({ type: PICK_PROJECT });
// export const toggle = () => ({ type: TOGGLE });
export const toggle = () => (dispatch, getState) => {
  const data = { ...getState().timer.data };
  if (!data.totalTime) data.totalTime = 0;
  data.isRunning = !data.isRunning;

  if (data.isRunning) {
    data.restartedAt = new Date();
  } else {
    data.totalTime += differenceInSeconds(new Date(), data.restartedAt);
    data.restartedAt = null;
  }

  dispatch(updateDatabase(data));
};
