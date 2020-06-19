import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Wrapper from '../../../common/HOCs/Wrapper';

import { getDate, formatHour, formatMinutes } from '../../../utils/helpers';
import useTime from '../../../common/hooks/time';

let stationPosition = 0;
let currentstationPosition = 0;
let stationPositionStart;
let stationPositionEnd;

let trainPosition = -8;

const TimeTable = ({ tableValues }) => {
	const { hours, minutes, isClockPaused, startingTime } = useTime();
	let timeInMinutes = parseInt(hours * 60 + minutes);

	const trainStared = getDate(tableValues.getIn([0, 'time']));
	const trainEnded = getDate(
		tableValues.getIn([tableValues.size - 1, 'time'])
	);

	let timeLengthStart = formatMinutes(trainStared);
	let timeLengthEnd = formatMinutes(trainEnded);
	let timeLength = parseInt((timeLengthEnd - timeLengthStart) * 5);

	useEffect(() => {
		if (!isClockPaused) {
			if (timeInMinutes >= startingTime) {
				trainPosition = parseInt(
					(timeInMinutes - startingTime) * 5 - 8
				);
			}
		}
	}, [
		hours,
		minutes,
		isClockPaused,
		timeLength,
		timeInMinutes,
		startingTime,
	]);

	return (
		<Wrapper className="app-time-table">
			<div
				className="app-train"
				style={{
					left: `${
						trainPosition >= timeLength
							? parseInt(timeLength - 8)
							: trainPosition
					}px`,
				}}
			></div>
			<div
				className="app-time-length"
				style={{
					width: `${timeLength}px`,
				}}
			>
				{tableValues.map((item, index) => {
					if (index === 0) {
						stationPosition = 0;
					}
					if (index > 0 && index <= tableValues.size - 1) {
						stationPositionStart = formatMinutes(
							getDate(tableValues?.get(index - 1)?.get('time'))
						);
						stationPositionEnd = formatMinutes(
							getDate(tableValues?.get(index)?.get('time'))
						);
						currentstationPosition = parseInt(
							(stationPositionEnd - stationPositionStart) * 5
						);
						stationPosition =
							stationPosition + currentstationPosition;
					}
					return (
						<div
							className="app-time-line"
							style={{ left: `${stationPosition}px` }}
							key={item.get('station')}
						>
							<div className="app-station"></div>
							<div className="app-marker"></div>
							<div className="app-time">
								{formatHour(getDate(item.get('time')))}
							</div>
						</div>
					);
				})}
			</div>
		</Wrapper>
	);
};

TimeTable.propTypes = {
	tableValues: PropTypes.instanceOf(List),
};

TimeTable.defaultProps = {
	tableValues: List(),
};

export default TimeTable;
