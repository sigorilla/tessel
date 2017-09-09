'use strict';

const {Board, Motors, Switch, Sensor} = require('johnny-five');
const Tessel = require('tessel-io');

const board = new Board({
    io: new Tessel()
});

// https://learn.sparkfun.com/tutorials/experiment-guide-for-the-johnny-five-inventors-kit/experiment-9-using-an-h-bridge-motor-controller-
// TODO web remote control
board.on('ready', () => {
    const switchDirection = new Switch('a0');
    const sensorSpeed = new Sensor('b0');
    const motors = new Motors([
        ['a5', 'a4', 'a3'],
        ['b5', 'b4', 'b3']
    ]);

    let speed = sensorSpeed.value >> 2;

    switchDirection.on('open', () => {
        motors.stop().forward(speed);
    });

    switchDirection.on('close', () => {
        motors.stop().reverse(speed);
    });

    sensorSpeed.on('change', () => {
        // 0 - 255
        speed = sensorSpeed.value >> 2;
        motors.speed(speed);
    });
});
