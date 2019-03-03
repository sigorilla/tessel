'use strict';

const {Board, Switch} = require('johnny-five');
const Tessel = require('tessel-io');
const {led} = require('tessel');

const board = new Board({
    io: new Tessel()
});

board.on('ready', () => {
    const door = new Switch({
        pin: 'b2',
        invert: true
    });

    door.on('open', () => led[2].on());
    door.on('close', () => led[2].off());
});
