'use strict';

const os = require('os');
// const debug = require('debug')();

const j5 = require('johnny-five');

const SocketIO = require('socket.io');

require('./board')(onReady);

const server = require('./server');
const io = new SocketIO(server);

const DELAY = 5000;

const PORT = 80;

function onReady() {
    const clients = new Set();
    const monitor = j5.Multi({
        controller: 'BME280',
        elevation: 2
    });
    let updated = Date.now() - DELAY;

    monitor.on('change', () => {
        const now = Date.now();
        if (now - updated < DELAY) {
            return;
        }

        updated = now;

        clients.forEach((client) => {
            client.emit('report', {
                thermometer: monitor.thermometer.celsius,
                barometer: monitor.barometer.pressure,
                hydrometer: monitor.hydrometer.relativeHumidity,
                altimeter: monitor.altimeter.meters
            });
        });
    });

    io.on('connection', (socket) => {
        if (clients.size < 5) {
            clients.add(socket);
            socket.on('disconnect', () => clients.delete(socket));
        }
    });

    server.listen(PORT, () => {
        console.log(`Server started, go to http://${os.hostname()}`);
    });

    process.on('SIGINT', () => server.close());
}
