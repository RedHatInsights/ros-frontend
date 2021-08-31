import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { init } from './store';
import App from './App';
import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/helpers';

const RosApp = () => (
    <Provider store={ init().getStore() }>
        <Router basename={ getBaseName(window.location.pathname, 2) }>
            <App />
        </Router>
    </Provider>
);

export default RosApp;
