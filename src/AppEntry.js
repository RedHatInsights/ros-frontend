import React from 'react';
import { Provider } from 'react-redux';
import { init } from './store';
import App from './App';
import logger from 'redux-logger';

const RosApp = () => (
    <Provider store={ process.env.NODE_ENV !== 'production' ? init(logger).getStore() : init().getStore() }>
        <App />
    </Provider>
);

export default RosApp;
