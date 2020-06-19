import React from 'react';
import PropTypes from 'prop-types';

import spinnerIcon from '../../assets/spinner.gif';

const Spinner = ({ isCentered }) => (
	<div className={`app-spinner ${isCentered ? 'is-centered' : null}`}>
		<img src={spinnerIcon} alt="Loading..." />
	</div>
);

Spinner.propTypes = {
	isCentered: PropTypes.bool,
};
Spinner.defaultProps = {
	isCentered: false,
};

export default Spinner;
