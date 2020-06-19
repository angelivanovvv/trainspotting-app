import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { List } from 'immutable';

const TableHeader = ({ columns }) => (
	<thead className="app-table-header">
		<tr>
			{columns.map((item) => (
				<th key={item.get('id')}>{item.get('name')}</th>
			))}
		</tr>
	</thead>
);

TableHeader.propTypes = {
	columns: PropTypes.instanceOf(List),
};
TableHeader.defaultProps = {
	columns: List(),
};

export default memo(TableHeader);
