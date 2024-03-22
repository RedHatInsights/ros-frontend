const path = require('path');

module.exports = {
    appUrl: '/insights/ros',
    debug: true,
    useProxy: true,
    proxyVerbose: true,
    /**
     * Change to false after your app is registered in configuration files
     */
    interceptChromeConfig: false,
    /**
     * Add additional webpack plugins
     */
    plugins: [],
    hotReload: process.env.HOT === 'true',
    moduleFederation: {
        exposes: {
            './RootApp': path.resolve(__dirname, './src/AppEntry.js'),
            './SystemDetail': path.resolve(__dirname, './src/Components/SystemDetail/SystemDetail.js')
        },       
      exclude: ['react-router-dom'],
      shared: [
        {
          'react-router-dom': {
            singleton: true,
            import: false,
            version: '^6.8.1',
          },
        },
      ],
    },
  };