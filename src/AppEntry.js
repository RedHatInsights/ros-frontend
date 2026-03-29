import React from 'react';
import { Provider } from 'react-redux';
import { init } from './store';
import App from './App';
import logger from 'redux-logger';
import { AccessCheck } from '@project-kessel/react-kessel-access-check';

const KESSEL_API_BASE_URL = '/api/kessel/v1beta2';

/**
 * @see https://github.com/project-kessel/kessel-sdk-browser/tree/master/packages/react-kessel-access-check#accesscheckprovider
 */
const RosApp = () => (
    <Provider store={ process.env.NODE_ENV !== 'production' ? init(logger).getStore() : init().getStore() }>
        <AccessCheck.Provider
            baseUrl={window.location.origin}
            apiPath={KESSEL_API_BASE_URL}
        >
            <App />
        </AccessCheck.Provider>
    </Provider>
);

export default RosApp;
