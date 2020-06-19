import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import TimeTable from '../TimeTable';
import MobileTimeTable from '../MobileTimeTable';

import { getWidnowSize } from '../../../utils/helpers';

const MainTimeTable = ({ tableInfo }) => {
	const [state, setState] = useState({
		screenSize: '',
	});
	const { screenSize } = state;

	const windowSize = () => {
		setState((prevState) => ({
			...prevState,
			screenSize: getWidnowSize(window.innerWidth),
		}));
	};

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

	return screenSize === 'phone' ? (
		<MobileTimeTable tableValues={tableInfo} />
	) : (
		<TimeTable tableValues={tableInfo} />
	);
};

MainTimeTable.propTypes = {
	tableInfo: PropTypes.instanceOf(List),
};
MainTimeTable.defaultProps = {
	tableInfo: List(),
};

export default MainTimeTable;
