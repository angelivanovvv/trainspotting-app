import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getJourneys,
	getIsLoading,
	getError,
	getErrorMessage,
} from '../../reduxSources/selectors/journeysSelectors';
import { journeys } from '../../reduxSources/actions/journeysActions';

const useJourneys = () => {
	const dispatch = useDispatch();

	const isLoading = useSelector((state) => getIsLoading(state));
	const response = useSelector((state) => getJourneys(state));
	const error = useSelector((state) => getError(state));
	const errorMessage = useSelector((state) => getErrorMessage(state));

	const journeysRequest = useCallback(() => {
		return dispatch(journeys());
	}, [dispatch]);

	return {
		isLoading,
		response,
		error,
		errorMessage,
		journeysRequest,
	};
};

export default useJourneys;
