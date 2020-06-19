import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Spinner from '../../Spinner';
import Wrapper from '../../../common/HOCs/Wrapper';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';

import {
	desktopColums,
	tabletColumns,
	phoneColumns,
} from '../../../constants/tableConfig';
import { getWidnowSize } from '../../../utils/helpers';
import useJourneys from '../../../common/hooks/journeys';

const Table = ({ hours, minutes, isClockPaused }) => {
	const [state, setState] = useState({
		screenSize: '',
		columns: List(),
	});
	const { screenSize, columns } = state;
	const { isLoading, response, journeysRequest } = useJourneys();

	const windowSize = () => {
		setState((prevState) => ({
			...prevState,
			screenSize: getWidnowSize(window.innerWidth),
		}));
	};

	const getColumns = useCallback((windowSize) => {
		switch (windowSize) {
			case 'desktop':
				return desktopColums;
			case 'tablet':
				return tabletColumns;
			case 'phone':
				return phoneColumns;
			default:
				return;
		}
	}, []);

	useEffect(() => {
		journeysRequest();
	}, [journeysRequest]);

	useEffect(() => {
		const hasWindow = typeof window !== 'undefined';
		if (hasWindow) {
			windowSize();
		}
		window.addEventListener('resize', windowSize);
		return () => {
			window.removeEventListener('resize', windowSize);
		};
	}, [screenSize]);

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			columns: getColumns(screenSize),
		}));
	}, [screenSize, getColumns]);
	return (
		<Wrapper className="app-table-container">
			{isLoading ? (
				<Spinner isCentered />
			) : (
				<table className="app-table">
					<TableHeader columns={columns} />
					<tbody className="app-table-body">
						{response &&
							response
								.valueSeq()
								.map((journey, index) => (
									<TableRow
										key={index}
										columns={columns}
										data={journey}
									/>
								))}
					</tbody>
				</table>
			)}
		</Wrapper>
	);
};

Table.propTypes = {
	isLoading: PropTypes.bool,
	hours: PropTypes.number,
	minutes: PropTypes.number,
	isClockPaused: PropTypes.bool,
	journeysResponse: PropTypes.instanceOf(List),
};
Table.defaultProps = {
	isLoading: false,
	hours: 0,
	minutes: 0,
	isClockPaused: true,
	journeysResponse: List(),
};

export default Table;
