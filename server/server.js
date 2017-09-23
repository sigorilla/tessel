'use strict';

const http = require('http');
const path = require('path');

const express = require('express');

const app = express();
const server = new http.Server(app);

const assetsPath = path.join(__dirname, '../client');
const vendorPath = path.join(__dirname, '../node_modules');

app
    .use(express.static(assetsPath))
    .use('/vendor', express.static(vendorPath))
    .use((_req, res) => {
        res.sendStatus(404);
    })
    .use((_req, res, _next, error) => {
        console.error(error.stack || error.message || error);
        res.sendStatus(500);
    });

module.exports = server;
