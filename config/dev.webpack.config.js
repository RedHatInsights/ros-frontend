// eslint-disable-next-line max-len
// Reference link: https://github.com/RedHatInsights/frontend-components/tree/master/packages/config#redhat-cloud-services-frontend-components---webpack-config

const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');
const { config: webpackConfig, plugins } = config({
    rootFolder: resolve(__dirname, '../'),
    debug: true,
    https: true,
    appUrl: process.env.PREVIEW ? '/preview/insights/ros' : '/insights/ros',
    env: `${process.env.ENVIRONMENT || 'stage'}-${process.env.PREVIEW ? 'preview' : 'stable'}`,
    deployment: process.env.PREVIEW ? 'preview/apps' : 'apps',
    useProxy: true,
    proxyVerbose: true,
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
