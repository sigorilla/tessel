'use strict';

const Tessel = require('tessel-io');
const j5 = require('johnny-five');

const board = new j5.Board({
    io: new Tessel()
});

board.on('ready', () => {
    const red = new j5.Led('a5');
    const green = new j5.Led('a6');
    red.blink(500);
    green.pulse(600);
});
