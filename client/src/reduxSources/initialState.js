import { fromJS } from 'immutable';

const initialState = fromJS({
	journeys: {
		isLoading: false,
		error: false,
		errorMessage: null,
		response: [],
	},
	time: {
		isClockPaused: true,
		hours: '',
		minutes: '',
		seconds: '',
	},
});

export default initialState;
