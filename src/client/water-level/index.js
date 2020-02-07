'use strict';

window.onload = () => {
    const socket = io();

    const $value = document.querySelector('#value');
    const $level = document.querySelector('#level');

    socket.on('report', (data) => {
        $value.style.color = data.color;
        $value.textContent = data.value;
        $level.style.top = `${100 - data.percent}%`;
    });
};
