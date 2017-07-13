'use strict';

const Tessel = require('tessel-io');
const j5 = require('johnny-five');

const board = new j5.Board({
    io: new Tessel()
});

board.on('ready', () => {
    const button = new j5.Button('a2');
    const led = new j5.Led('a5');

    button.on('press', () => {
        led.blink(1000);
    });

    button.on('release', () => {
        led.stop();
    });
});
