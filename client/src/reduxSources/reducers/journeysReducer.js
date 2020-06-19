import * as actionTypes from '../../constants/actionTypes';
import initialState from '../initialState';

const journeysState = initialState.get('journeys');

const journeysReducer = (state = journeysState, { type, payload }) => {
	switch (type) {
		case actionTypes.JOURNEYS_REQUEST:
			return state
				.set('isLoading', true)
				.set('error', false)
				.set('errorMessage', null);
		case actionTypes.JOURNEYS_REQUEST_SUCCESS:
			return state
				.set('isLoading', false)
				.set('response', payload)
				.set('error', false)
				.set('errorMessage', null);
		case actionTypes.JOURNEYS_REQUEST_FAILD:
			return state
				.set('isLoading', false)
				.set('error', true)
				.set('errorMessage', payload)
				.set('response', initialState.getIn(['journeys', 'response']));
		default:
			return state;
	}
};

export default journeysReducer;
