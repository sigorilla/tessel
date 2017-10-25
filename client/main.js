'use strict';

const MAX_GAMMA = 90;
const MAX_SPEED = 255;

const MAX_BETA = 45;

window.onload = () => {
    const socket = io();

    const $speed = find('#speed');
    const $direction = find('#direction');
    const $start = find('#start');
    const $stop = find('#stop');
    // const $log = find('#log');

    $speed.addEventListener('change', () => {
        socket.emit('change speed', Number($speed.value));
    });

    $direction.addEventListener('change', () => {
        socket.emit('change direction', $direction.value);
    });

    $start.addEventListener('click', () => {
        socket.emit('start');
    });

    $stop.addEventListener('click', () => {
        socket.emit('stop');
    });

    window.addEventListener('deviceorientation', ({beta, gamma}) => {
        const data = {
            speed: Math.round(MAX_SPEED - MAX_SPEED * limitAbs(gamma, 0, MAX_GAMMA) / MAX_GAMMA),
            rotateDir: Math.sign(gamma * beta),
            rotateK: 1 - limitAbs(beta, 0, MAX_BETA) / MAX_BETA
        };
        $speed.value = data.speed;

        socket.emit('move', data);
    });
};

function find(sel) {
    return window.document.querySelector(sel);
}

function limitAbs(n, min, max) {
    return Math.min(Math.max(Math.abs(n), min), max);
}
