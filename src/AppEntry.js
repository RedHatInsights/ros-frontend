import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { init } from './store';
import App from './App';
import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import logger from 'redux-logger';

const RosApp = () => (
    <Provider store={ process.env.NODE_ENV !== 'production' ? init(logger).getStore() : init().getStore() }>
        <Router basename={ getBaseName(window.location.pathname, 2) }>
            <App />
        </Router>
    </Provider>
);

export default RosApp;
