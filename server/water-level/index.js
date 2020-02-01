'use strict';

require('dotenv').config({
    path: `${__dirname}/../../.env`
});

const os = require('os');
const {Sensor} = require('johnny-five');
const SocketIO = require('socket.io');

const server = require('../lib/server');
const IFTTTMaker = require('../lib/ifttt-maker');

const io = new SocketIO(server);

const PORT = 80;
const SOCKET_DELAY = 5000;

const ifttt = new IFTTTMaker({
    token: process.env.IFTTT_TOKEN
});

console.log('Script is running. Now waiting for board ready...');
require('../lib/board')(onReady);

function onReady() {
    console.log('Board is ready.');

    const clients = new Set();

    const sensor = new Sensor('a7');

    let updated = Date.now() - SOCKET_DELAY;

    sensor.on('change', () => {
        const now = Date.now();
        if (now - updated < SOCKET_DELAY || sensor.value === null) {
            return;
        }

        updated = now;

        // console.log(sensor.analog, sensor.value);
        io.sockets.emit('report', {
            analog: sensor.analog,
            value: sensor.value
        });
        // TODO: Change delay
        ifttt.send('need_water', {value1: 'Plant', value2: sensor.value});
    });

    io.on('connection', (socket) => {
        if (clients.size < 15) {
            clients.add(socket);
            socket.on('disconnect', () => clients.delete(socket));
        }
    });

    server.listen(PORT, () => {
        console.log(`Server started, go to http://${os.hostname()}`);
    });

    process.on('SIGINT', () => server.close());
}
