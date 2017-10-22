'use strict';

window.onload = () => {
    const socket = io();

    const speed = find('#speed');
    const direction = find('#direction');
    const start = find('#start');
    const stop = find('#stop');

    speed.addEventListener('input', () => {
        socket.emit('change speed', Number(speed.value));
    });
    direction.addEventListener('change', () => {
        socket.emit('change direction', direction.value);
    });
    start.addEventListener('click', () => {
        socket.emit('start');
    });
    stop.addEventListener('click', () => {
        socket.emit('stop');
    });

    window.addEventListener('deviceorientation', (e) => {
        socket.emit('change speed', Number(getSpeed(e.beta)));
    });
};

function find(sel) {
    return window.document.querySelector(sel);
}

function getSpeed(beta) {
    return Math.round(beta * -255 / 90) + 255;
}
