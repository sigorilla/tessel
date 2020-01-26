'use strict';

const Tessel = require('tessel-io');
const j5 = require('johnny-five');

module.exports = (cb) => {
    const board = new j5.Board({
        io: new Tessel()
    });

    board.on('ready', cb);

    return board;
};
