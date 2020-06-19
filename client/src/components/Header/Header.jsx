import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Wrapper from '../../common/HOCs/Wrapper';

import { currentTime, transformTrainsInTransit } from '../../utils/helpers';
import useJourneys from '../../common/hooks/journeys';
import useTime from '../../common/hooks/time';

let Clock;
const Header = () => {
	const { response, journeysRequest } = useJourneys();
	const {
		startingTime,
		hours,
		minutes,
		isClockPaused,
		toStartTime,
		toStopTime,
		toGetTime,
	} = useTime();
	const [state, setState] = useState({
		trains: [],
	});
	const { trains } = state;
	let showHours = hours < 10 ? `0${hours}` : `${hours}`;
	let showMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

	let timeInMinutes = parseInt(hours * 60 + minutes);
	let trainsInTrainsit = transformTrainsInTransit(response);

	const startClock = useCallback(() => {
		toStartTime();
		Clock = setInterval(() => {
			currentTime(toGetTime);
		}, 1000);

		if (timeInMinutes >= startingTime) {
			trainsInTrainsit.forEach((train) => {
				if (timeInMinutes < train.get('trainTime')) {
					setState((prevState) => ({
						...prevState,
						trains: prevState.trains.concat(train.get('train')),
					}));
				}
			});
		}
	}, [trainsInTrainsit, timeInMinutes, toGetTime, toStartTime]);

	const stopClock = useCallback(() => {
		toStopTime();
		clearInterval(Clock);
		setState((prevState) => ({
			...prevState,
			trains: [],
		}));
	}, [toStopTime]);

	useEffect(() => {
		journeysRequest();
		currentTime(toGetTime);
	}, [journeysRequest, toGetTime]);

	useEffect(() => {
		if (!isClockPaused) {
			trainsInTrainsit.forEach((train) => {
				if (timeInMinutes >= train.get('trainTime')) {
					let trainIndex = trains.indexOf(train.get('train'));
					if (trainIndex !== -1) {
						setState((prevState) => {
							trains.splice(trainIndex, 1);
							return {
								...prevState,
								trains: trains,
							};
						});
					}
				}
			});
		}
	}, [response, hours, minutes, isClockPaused]);

	return (
		<Wrapper className="app-header">
			<div className="app-header-row">
				<h3 className="app-header-title">Jiminny Trainspotting</h3>
				<button
					type="button"
					className="app-header-button"
					onClick={isClockPaused ? startClock : stopClock}
				>
					{isClockPaused ? 'Start' : 'Stop'}
				</button>
			</div>
			<div className="app-header-row">
				<div className="app-header-column app-header-column-mobile">
					<span className="app-header-subtitle app-bold">
						Trains in Transit:
					</span>
					{trains.length !== 0 ? (
						trains.map((train) => (
							<span key={train} className="app-header-info">
								{train}
							</span>
						))
					) : (
						<span className="app-header-info">none</span>
					)}
				</div>
				<div className="app-header-column app-header-column-mobile">
					<span className="app-header-subtitle app-bold">
						Current Time:
					</span>
					<span className="app-header-info">{`${showHours}:${showMinutes}`}</span>
				</div>
			</div>
		</Wrapper>
	);
};

Header.propTypes = {
	isLoading: PropTypes.bool,
	response: PropTypes.instanceOf(List),
	hours: PropTypes.number,
	minutes: PropTypes.number,
	isClockPaused: PropTypes.bool,
	journeysRequest: PropTypes.func,
	toStartTime: PropTypes.func,
	toStopTime: PropTypes.func,
	toGetTime: PropTypes.func,
};
Header.defaultProps = {
	isLoading: false,
	response: List(),
	hours: 0,
	minutes: 0,
	isClockPaused: true,
	journeysRequest: () => {},
	toStartTime: () => {},
	toStopTime: () => {},
	toGetTime: () => {},
};

export default Header;
