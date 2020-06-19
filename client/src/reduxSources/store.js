import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';

import makeRootReducer from './rootReducer';

const initialState = fromJS({});

const initStore = (history) =>
	createStore(
		makeRootReducer(history),
		initialState,
		composeWithDevTools(applyMiddleware(thunk))
	);

export default initStore;
