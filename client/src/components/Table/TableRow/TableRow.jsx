import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Map, List } from 'immutable';

import TableCell from '../TableCell';

const TableRow = ({ columns, data }) => (
	<tr>
		{columns.valueSeq().map((column) => (
			<TableCell
				key={column.get('id')}
				type={column.get('key')}
				name={data.get('name')}
				route={data.get('route')}
				timetable={data.get('timetable')}
				firstStation={data.getIn(['timetable', 0, 'station'])}
				lastStation={data.getIn([
					'timetable',
					data.get('timetable').size - 1,
					'station',
				])}
				train={data.getIn(['train', 'name'])}
			/>
		))}
	</tr>
);

TableRow.propTypes = {
	columns: PropTypes.instanceOf(List),
	data: PropTypes.instanceOf(Map),
};
TableRow.defaultProps = {
	columns: List(),
	data: Map(),
};

export default memo(TableRow);
