import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import MainTimeTable from '../../TimeTable/MainTimeTable';
import Station from '../../Station';

const TableCell = ({
	type,
	name,
	route,
	firstStation,
	lastStation,
	train,
	timetable,
}) => {
	switch (type) {
		case 'name':
			return <td>{name}</td>;
		case 'route':
			return <td>{route}</td>;
		case 'name/route':
			return <td>{`${name} / ${route}`}</td>;
		case 'timetable':
			return (
				<td>
					<MainTimeTable tableInfo={timetable} />
				</td>
			);
		case 'station':
			return (
				<td>
					<Station
						firstStation={firstStation}
						lastStation={lastStation}
						stationInfo={timetable}
					/>
				</td>
			);
		case 'train':
			return <td>{train}</td>;
		default:
			return null;
	}
};

TableCell.propTypes = {
	type: PropTypes.string,
	name: PropTypes.string,
	route: PropTypes.string,
	timetable: PropTypes.instanceOf(List),
	firstStation: PropTypes.string,
	lastStation: PropTypes.string,
	train: PropTypes.string,
};
TableCell.defaultProps = {
	type: '',
	name: '',
	route: '',
	timetable: List(),
	firstStation: '',
	lastStation: '',
	train: '',
};

export default memo(TableCell);
