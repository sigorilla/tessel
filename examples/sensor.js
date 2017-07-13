'use strict';

const Tessel = require('tessel-io');
const j5 = require('johnny-five');
const debug = require('debug')('j5:sensor');

const board = new j5.Board({
    io: new Tessel()
});

board.on('ready', () => {
    const sensor = new j5.Sensor('a7');
    const led = new j5.Led('b5');

    sensor.on('change', () => {
        debug(sensor);
        led.brightness(sensor.analog);
    });
});
