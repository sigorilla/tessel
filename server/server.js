'use strict';

const http = require('http');
const path = require('path');

const Express = require('express');

const app = new Express();
const server = new http.Server(app);

const assetsPath = path.join(__dirname, './');
const vendorPath = path.join(__dirname, '../node_modules');

app
    .use(Express.static(assetsPath))
    .use('/vendor', Express.static(vendorPath));

module.exports = server;
