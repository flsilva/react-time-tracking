export const PICK_DATE = 'app/timer/pick/date/requested';
export const PICK_HOUR = 'app/timer/pick/hour/requested';
export const PICK_MINUTE = 'app/timer/pick/minute/requested';
export const PICK_PROJECT = 'app/timer/pick/project/requested';
export const TOGGLE = 'app/timer/toggle/requested';

export const pickDate = () => ({ type: PICK_DATE });
export const pickHour = () => ({ type: PICK_HOUR });
export const pickMinute = () => ({ type: PICK_MINUTE });
export const pickProject = () => ({ type: PICK_PROJECT });
export const toggle = () => ({ type: TOGGLE });
