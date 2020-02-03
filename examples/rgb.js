'use strict';

const Tessel = require('tessel-io');
const {Board, Led} = require('johnny-five');

const board = new Board({
    io: new Tessel()
});

board.on('ready', () => {
    // http://johnny-five.io/api/led.rgb/
    const led = new Led.RGB({
        pins: {
            red: 'a5',
            green: 'a6',
            blue: 'b5'
        }
    });

    let index = 0;
    const rainbow = ['white', 'black', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

    board.loop(1000, () => {
        led.color(rainbow[index]);
        index = index + 1;
        if (index === rainbow.length) {
            index = 0;
        }
    });
});
