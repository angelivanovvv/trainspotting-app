import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Wrapper from '../../../common/HOCs/Wrapper';

import { getDate, formatHour } from '../../../utils/helpers';

const MobileTimeTable = ({ tableValues }) => (
	<Wrapper className="app-time-table-mobile">
		<ul className="app-time-table-list">
			{tableValues.map((item, index) => (
				<li key={index} className="app-time-table-item">
					<span>{`${formatHour(
						getDate(item.get('time'))
					)}: ${item.get('station')}`}</span>
				</li>
			))}
		</ul>
	</Wrapper>
);

MobileTimeTable.propTypes = {
	tableValues: PropTypes.instanceOf(List),
};
MobileTimeTable.defaultProps = {
	tableValues: List(),
};

export default MobileTimeTable;
