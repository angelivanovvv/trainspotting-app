import { createSelector } from 'reselect';

export const journeys = (state) => state.get('journeys');

export const getJourneys = createSelector(journeys, (journey) =>
	journey.get('response')
);

export const getIsLoading = createSelector(journeys, (journey) =>
	journey.get('isLoading')
);

export const getError = createSelector(journeys, (journey) =>
	journey.get('error')
);

export const getErrorMessage = createSelector(journeys, (journey) =>
	journey.get('errorMessage')
);
