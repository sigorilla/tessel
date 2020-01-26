'use strict';

const os = require('os');
const {Multi} = require('johnny-five');
const SocketIO = require('socket.io');

const server = require('../lib/server');
const io = new SocketIO(server);

const PORT = 80;
const DELAY = 5000;

require('../lib/board')(onReady);

function onReady() {
    const clients = new Set();

    // I2C: GND, VCC, SCL (A0/B0), SDA (A1/B1).
    const monitor = new Multi({
        controller: 'BME280',
        // http://johnny-five.io/api/altimeter/
        // https://elevation.city/ru/b90l
        elevation: 144
    });
    let updated = Date.now() - DELAY;

    monitor.on('change', () => {
        const now = Date.now();
        if (now - updated < DELAY) {
            return;
        }

        updated = now;

        io.sockets.emit('report', {
            thermometer: monitor.thermometer.celsius,
            barometer: monitor.barometer.pressure,
            hydrometer: monitor.hydrometer.relativeHumidity,
            altimeter: monitor.altimeter.meters
        });
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
