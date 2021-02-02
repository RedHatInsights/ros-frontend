/*global module*/

const goodGuyLib = require('good-guy-http');

const SECTION = 'insights';
const APP_ID = 'ros';
const FRONTEND_PORT = 8002;
const routes = {};

routes[`/beta/${SECTION}/${APP_ID}`] = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/${SECTION}/${APP_ID}`]      = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/beta/apps/${APP_ID}`]       = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/apps/${APP_ID}`]            = { host: `https://localhost:${FRONTEND_PORT}` };

const esi = {
    // Increases the default (2s) timeout which can be a pain sometimes.
    // https://github.com/Schibsted-Tech-Polska/good-guy-http/blob/master/lib/index.js#L55
    httpClient: goodGuyLib({
        timeout: 5000
    })
};

module.exports = { routes, esi };
