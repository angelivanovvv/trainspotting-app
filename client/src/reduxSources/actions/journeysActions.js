import * as actionTypes from '../../constants/actionTypes';

import api from '../../common/rest-api/api';
import { transformResponse, transformError } from '../../utils/helpers';

const journeysRequest = () => ({
	type: actionTypes.JOURNEYS_REQUEST,
});

const journeysSuccess = (response) => ({
	type: actionTypes.JOURNEYS_REQUEST_SUCCESS,
	payload: transformResponse(response),
});

const journeysFaild = (error) => ({
	type: actionTypes.JOURNEYS_REQUEST_FAILD,
	payload: transformError(error),
});

export const journeys = () => async (dispatch) => {
	dispatch(journeysRequest());
	try {
		const response = await api.getJourneys();
		dispatch(journeysSuccess(response));
	} catch (error) {
		dispatch(journeysFaild(error));
	}
};
