'use strict';

require('dotenv').config({
    path: `${__dirname}/../../.env`
});

const os = require('os');
const {Sensor, Led} = require('johnny-five');
const SocketIO = require('socket.io');
const {throttle} = require('throttle-debounce');

const server = require('../lib/server');
const IFTTTMaker = require('../lib/ifttt-maker');
const COLORS = require('./colors');

const io = new SocketIO(server);

const PORT = 80;
const MAX_VALUE = 500;
const NOTIFY_THRESHOLD = MAX_VALUE / 2;
const NOTIFY_DELAY = 5000;

// https://ifttt.com/maker_webhooks
const ifttt = new IFTTTMaker({
    token: process.env.IFTTT_TOKEN
});

const notify = throttle(NOTIFY_DELAY, (value) => {
    ifttt.send('need_water', {value1: 'Plant', value2: String(value || 0)});
});

console.log('Script is running. Now waiting for board ready...');
require('../lib/board')(onReady);

function onReady() {
    console.log('Board is ready!');

    // http://johnny-five.io/api/sensor/
    const sensor = new Sensor({
        pin: 'b7',
        threshold: 30
    });
    // http://johnny-five.io/api/led.rgb/
    const led = new Led.RGB({
        pins: {
            red: 'a5',
            green: 'a6',
            blue: 'b5'
        }
    });

    sensor.on('change', () => {
        const colors = COLORS.slice().sort(() => Math.random() - 0.5);
        const colorIndex = sensor.scaleTo(0, colors.length - 1);
        const color = colors[colorIndex];
        led.color(color).intensity(30);

        const value = sensor.scaleTo(0, MAX_VALUE);
        io.sockets.emit('report', {
            color,
            value,
            percent: value * 100 / MAX_VALUE
        });

        if (value < NOTIFY_THRESHOLD) {
            notify(value);
        }
    });

    server.listen(PORT, () => {
        console.log(`Server started, go to http://${os.hostname()}/water-level/`);
    });

    process.on('SIGINT', () => server.close());
}
