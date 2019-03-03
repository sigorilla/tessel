'use strict';

const {Board, Multi, LCD} = require('johnny-five');
const Tessel = require('tessel-io');
const {format} = require('date-fns');

const board = new Board({
    io: new Tessel()
});

board.on('ready', () => {
    const bme = new Multi({
        controller: 'BME280'
    });

    const lcd = new LCD({
        pins: ['a2', 'a3', 'a4', 'a5', 'a6', 'a7']
    });

    const snapshots = ['', ''];

    board.loop(100, () => {
        const updates = [
            format(new Date(), 'DD.MM.YY HH:mm'),
            `${bme.thermometer.celsius.toFixed(1)} C`
        ];

        updates.forEach((update, index) => {
            if (snapshots[index] !== update) {
                snapshots[index] = update;
                lcd.cursor(index, 0).print(update);
            }
        });
    });
});
