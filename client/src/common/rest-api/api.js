import { getRequest } from './api-requests.js';
import config from './api-config';

const { url } = config;

const api = Object.freeze({
	getJourneys: () => getRequest(`${url}/journeys`),
});

export default api;
