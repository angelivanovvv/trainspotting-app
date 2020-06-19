import React from 'react';

import { Provider } from 'react-redux';

import initStore from './reduxSources/store';

import Wrapper from './common/HOCs/Wrapper';
import Layout from './components/Layout';

import './styles/app.scss';

const store = initStore();

const App = () => (
	<Provider store={store}>
		<Wrapper className="app-main" isMain>
			<Layout />
		</Wrapper>
	</Provider>
);

export default App;
