const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');
const { config: webpackConfig, plugins } = config({
    rootFolder: resolve(__dirname, '../'),
    debug: true,
    https: true,
    appUrl: process.env.BETA ? '/beta/insights/ros' : '/insights/ros',
    env: `${process.env.ENVIRONMENT || 'stage'}-${process.env.BETA ? 'beta' : 'stable'}`,
    deployment: process.env.BETA ? 'beta/apps' : 'apps',
    useProxy: true,
    useChromeTemplate: true,
    localChrome: process.env.INSIGHTS_CHROME
});

plugins.push(
    require('@redhat-cloud-services/frontend-components-config/federated-modules')({
        root: resolve(__dirname, '../'),
        useFileHash: false,
        exposes: {
            './RootApp': resolve(__dirname, '../src/AppEntry'),
            './SystemDetail': resolve(__dirname, '../src/Components/SystemDetail/SystemDetail')
        }
    })
);

module.exports = {
    ...webpackConfig,
    plugins
};
