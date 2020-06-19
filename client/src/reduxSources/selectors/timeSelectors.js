import { createSelector } from 'reselect';

export const timeObject = (state) => state.get('time');

export const getHours = createSelector(timeObject, (time) => time.get('hours'));

export const getMnutes = createSelector(timeObject, (time) =>
	time.get('minutes')
);

export const getSeconds = createSelector(timeObject, (time) =>
	time.get('seconds')
);

export const getIsClockPaused = createSelector(timeObject, (time) =>
	time.get('isClockPaused')
);
