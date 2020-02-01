'use strict';

const Tessel = require('tessel-io');
const j5 = require('johnny-five');

const board = new j5.Board({
    io: new Tessel()
});

board.on('ready', () => {
    const sensor = new j5.Sensor('a7');
    const led = new j5.Led('b5');

    sensor.on('change', () => {
        console.log(sensor.analog, sensor.value);
        led.brightness(sensor.analog);
    });
});
