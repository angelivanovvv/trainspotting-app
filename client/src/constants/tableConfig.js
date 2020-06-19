import { fromJS } from 'immutable';

export const desktopColums = fromJS([
	{ id: 0, key: 'name', name: 'Name' },
	{ id: 1, key: 'route', name: 'Route' },
	{ id: 2, key: 'timetable', name: 'Timetable' },
	{ id: 3, key: 'station', name: 'Next Station' },
	{ id: 4, key: 'train', name: 'Train' },
]);

export const tabletColumns = fromJS([
	{ id: 0, key: 'name/route', name: 'Name/Route' },
	{ id: 2, key: 'timetable', name: 'Timetable' },
	{ id: 3, key: 'station', name: 'Next Station' },
	{ id: 4, key: 'train', name: 'Train' },
]);

export const phoneColumns = fromJS([
	{ id: 0, key: 'name', name: 'Name' },
	{ id: 1, key: 'route', name: 'Route' },
	{ id: 2, key: 'timetable', name: 'Timetable' },
	{ id: 4, key: 'train', name: 'Train' },
]);
