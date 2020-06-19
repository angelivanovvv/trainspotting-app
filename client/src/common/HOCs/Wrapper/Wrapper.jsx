import React from 'react';
import PropTypes from 'prop-types';

const Wrapper = ({ className, children, isMain, onClick }) =>
	isMain ? (
		<main className={className} onClick={onClick}>
			{children}
		</main>
	) : (
		<div className={className} onClick={onClick}>
			{children}
		</div>
	);

Wrapper.propTypes = {
	isMain: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node,
	onClick: PropTypes.func,
};
Wrapper.defaultTypes = {
	isMain: false,
	className: '',
	children: null,
	onClick: () => {},
};

export default Wrapper;
