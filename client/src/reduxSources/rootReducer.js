import { combineReducers } from 'redux-immutable';

import journeys from './reducers/journeysReducer';
import time from './reducers/timeReducer';

const rootReducer = (history) =>
	combineReducers({
		time,
		journeys,
	});

export default rootReducer;
