import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getIsClockPaused,
	getHours,
	getMnutes,
	getSeconds,
} from '../../reduxSources/selectors/timeSelectors';
import {
	startTime,
	stopTime,
	getTime,
} from '../../reduxSources/actions/timeActions';

const useTime = () => {
	const dispatch = useDispatch();

	const startingTime = parseInt(9 * 60 + 0);
	const hours = useSelector((state) => getHours(state));
	const minutes = useSelector((state) => getMnutes(state));
	const seconds = useSelector((state) => getSeconds(state));
	const isClockPaused = useSelector((state) => getIsClockPaused(state));

	const toStartTime = useCallback(() => dispatch(startTime()), [dispatch]);
	const toStopTime = useCallback(() => dispatch(stopTime()), [dispatch]);
	const toGetTime = useCallback(
		(hours, minutes, seconds) => dispatch(getTime(hours, minutes, seconds)),
		[dispatch]
	);

	return {
		startingTime,
		hours,
		minutes,
		seconds,
		isClockPaused,
		toStartTime,
		toStopTime,
		toGetTime,
	};
};

export default useTime;
