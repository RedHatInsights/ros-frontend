const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');
const { config: webpackConfig, plugins } = config({
    rootFolder: resolve(__dirname, '../'),
    sassPrefix: '.ros, .inventory',
    debug: true,
    https: true,
    ...(process.env.BETA && { deployment: 'beta/apps' })
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
