const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');

const { config: webpackConfig, plugins } = config({
    rootFolder: resolve(__dirname, '../'),
    debug: true,
    https: true,
    appUrl: process.env.BETA ? ['/preview/insights/ros', '/beta/insights/ros'] : '/insights/ros',
    env: 'stage-stable',
    deployment: process.env.BETA ? 'beta/apps' : 'apps',
    useProxy: true,
    proxyVerbose: true,
    useChromeTemplate: true,
    localChrome: process.env.INSIGHTS_CHROME,
    routes: {
        '/api/ros/v1': {
            host: 'http://localhost:8000'
        },
        '/api/inventory/v1': {
            host: 'http://localhost:8001'
        }
    }
});

plugins.push(
    require('@redhat-cloud-services/frontend-components-config/federated-modules')({
        root: resolve(__dirname, '../'),
        useFileHash: false,
        exposes: {
            './RootApp': resolve(__dirname, '../src/AppEntry'),
            './SystemDetail': resolve(__dirname, '../src/Components/SystemDetail/SystemDetail')
        },
        shared: [{
            'react-router-dom': { singleton: true, requiredVersion: '*' }
        }]
    })
);

module.exports = {
    ...webpackConfig,
    plugins
};
