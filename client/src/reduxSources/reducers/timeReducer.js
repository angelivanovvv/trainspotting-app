import * as actionTypes from '../../constants/actionTypes';
import initialState from '../initialState';

const timeState = initialState.get('time');

const timeReducer = (state = timeState, { type, payload }) => {
	switch (type) {
		case actionTypes.START_TIME:
			return state.set('isClockPaused', false);
		case actionTypes.STOP_TIME:
			return state.set('isClockPaused', true);
		case actionTypes.GET_TIME:
			return state
				.set('hours', parseInt(payload.get('hours')))
				.set('minutes', parseInt(payload.get('minutes')))
				.set('seconds', parseInt(payload.get('seconds')));
		default:
			return state;
	}
};

export default timeReducer;
