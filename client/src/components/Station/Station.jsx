import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Wrapper from '../../common/HOCs/Wrapper';

import useTime from '../../common/hooks/time';
import { transformTrainStations } from '../../utils/helpers';

const Station = ({ firstStation, lastStation, stationInfo }) => {
	const { hours, minutes, isClockPaused, startingTime } = useTime();
	const [state, setState] = useState({ station: null });
	const { station } = state;

	let timeInMinutes = parseInt(hours * 60 + minutes);
	let trainStation = transformTrainStations(stationInfo);

	useEffect(() => {
		let currentStation = null;
		if (!isClockPaused) {
			if (timeInMinutes >= startingTime) {
				currentStation = trainStation.find(
					(item) => timeInMinutes <= item.get('time')
				);
			}
			setState((prevState) => ({
				...prevState,
				station: currentStation
					? currentStation.get('station')
					: lastStation,
			}));
		}
	}, [hours, minutes, startingTime, isClockPaused]);

	return (
		<Wrapper className="app-station">
			{isClockPaused ? firstStation : station}
		</Wrapper>
	);
};

Station.propTypes = {
	stationInfo: PropTypes.instanceOf(List),
	firstStation: PropTypes.string,
	lastStation: PropTypes.string,
};
Station.defaultProps = {
	stationInfo: List(),
	firstStation: '',
	lastStation: '',
};

export default memo(Station);
