import * as actionTypes from '../../constants/actionTypes';
import { Map } from 'immutable';

export const startTime = () => ({
	type: actionTypes.START_TIME,
});

export const stopTime = () => ({
	type: actionTypes.STOP_TIME,
});

export const getTime = (hours, minutes, seconds) => ({
	type: actionTypes.GET_TIME,
	payload: Map({ hours, minutes, seconds }),
});
