import { fromJS, Map } from 'immutable';
import moment from 'moment';
import storage from 'store';

export const localStorage = Object.freeze({
	save: (name, value) => storage.set(name, value),
	remove: (name) => storage.remove(name),
	get: (name) => storage.get(name),
});

export const transformResponse = (response) =>
	response ? fromJS(response?.body) : response?.body;

export const transformError = (error) =>
	error
		? fromJS(error?.response?.error?.message)
		: error?.response?.error?.message;

export const transformTrainsInTransit = (response) =>
	!response
		? []
		: response.map((item) => {
				const trasnformedTrainTime = item
					.get('timetable')
					.filter((_item, index, array) => index === array.size - 1)
					.map((item) => formatMinutes(getDate(item.get('time'))));
				return Map({
					train: item.getIn(['train', 'name']),
					trainTime: trasnformedTrainTime.get(0),
				});
		  });

export const transformTrainStations = (response) =>
	!response
		? []
		: response.map((item) =>
				Map({
					time: formatMinutes(getDate(item.get('time'))),
					station: item.get('station'),
				})
		  );

export const getWidnowSize = (width) => {
	let windowSize;
	if (width < 1300 && width > 1024) {
		windowSize = 'tablet';
	} else if (width < 1024) {
		windowSize = 'phone';
	} else {
		windowSize = 'desktop';
	}
	return windowSize;
};

export const currentTime = (callback) => {
	// control time object what time you want to show
	// var d = new Date();
	// var utc = d.getTime() + d.getTimezoneOffset() * 60000;
	// var nd = new Date(utc + 3600000 * -1.1);

	const date = new Date();
	let hour = date.getHours();
	let min = date.getMinutes();
	let sec = date.getSeconds();

	hour = updateTime(hour);
	min = updateTime(min);
	sec = updateTime(sec);

	callback(hour, min, sec);
	// console.log(hour + ':' + min + ':' + sec);
};

export const updateTime = (value) => (value < 10 ? '0' + value : value);

export const getDate = (date) => date?.slice(0, -1);

export const formatDate = (date) => moment(date).format('YYYY-MM-DD');

export const formatHour = (date) => moment(date).format('HH:mm');

export const formatMinutes = (date) =>
	moment.duration(moment(date).format('HH:mm')).asMinutes();
