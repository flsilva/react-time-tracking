import addSeconds from 'date-fns/add_seconds';
import addHours from 'date-fns/add_hours';
import subHours from 'date-fns/sub_hours';
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
  return differenceInSeconds(addSeconds(new Date(), totalTime), restartedAt);
};

const getHours = (restartedAt, totalTime) => {
  if (!restartedAt) return 0;
  return Math.floor(getTotalElapsedSeconds(restartedAt, totalTime) / 3600);
};

const getMinutes = (restartedAt, totalTime) => {
  if (!restartedAt) return 0;
  return Math.floor(getTotalElapsedSeconds(restartedAt, totalTime) / 60) - (getHours(restartedAt, totalTime) * 60);
};

const updateDatabase = payload => ({ type: UPDATE_DATABASE, payload });

export const pickDate = () => ({ type: PICK_DATE });
// export const pickHour = () => ({ type: PICK_HOUR });
export const pickHour = hours => (dispatch, getState) => {
  const data = { ...getState().timer.data };
  const currentHours = getHours(data.restartedAt, data.totalTime);

  if (hours === currentHours) return;

  if (hours > currentHours) {
    // data.restartedAt = subHours(data.restartedAt, hours - currentHours);
    data.totalTime += (hours - currentHours) * 3600;
  } else {
    // data.restartedAt = addHours(data.restartedAt, currentHours - hours);
    data.totalTime -= (currentHours - hours) * 3600;
  }

  dispatch(updateDatabase(data));
};
// export const pickMinute = () => ({ type: PICK_MINUTE });

export const pickMinute = minutes => (dispatch, getState) => {
  const data = { ...getState().timer.data };
  const currentMinutes = getMinutes(data.restartedAt, data.totalTime);

  if (minutes === currentMinutes) return;

  if (minutes > currentMinutes) {
    data.restartedAt = subMinutes(data.restartedAt, minutes - currentMinutes);
  } else {
    data.restartedAt = addMinutes(data.restartedAt, currentMinutes - minutes);
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
    // data.restartedAt = subMinutes(new Date(), 58);
  } else {
    data.totalTime += differenceInSeconds(new Date(), data.restartedAt);
    data.restartedAt = null;
    console.log('------- PAUSED ------- data.totalTime: ', data.totalTime);
  }

  dispatch(updateDatabase(data));
};
