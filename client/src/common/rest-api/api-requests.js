import superAgent from 'superagent';

const getRequest = (route) =>
	new Promise((resolve, reject) => {
		superAgent
			.get(route)
			.then((response) => resolve(response))
			.catch((error) => reject(error));
	});

const postRequest = (route, details) =>
	new Promise((resolve, reject) => {
		superAgent
			.post(route)
			.send(details)
			.then((response) => resolve(response))
			.catch((error) => reject(error));
	});

const putRequest = (route, details) =>
	new Promise((resolve, reject) => {
		superAgent
			.put(route)
			.send(details)
			.then((response) => resolve(response))
			.catch((error) => reject(error));
	});

const deleteRequest = (route) =>
	new Promise((resolve, reject) => {
		superAgent
			.delete(route)
			.then((response) => resolve(response))
			.catch((error) => reject(error));
	});

export { getRequest, postRequest, putRequest, deleteRequest };
