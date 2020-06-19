import React from 'react';

import Wrapper from '../../common/HOCs/Wrapper';
import Header from '../../components/Header';
import Table from '../Table/Table';

const Layout = () => (
	<Wrapper className="app-layout">
		<Header />
		<Table />
	</Wrapper>
);

export default Layout;
