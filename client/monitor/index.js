'use strict';

window.onload = () => {
    const socket = io();

    const monitors = {
        thermometer: new JustGage({
            id: 'thermometer',
            value: 0,
            min: 0,
            max: 100,
            textRenderer: (value) => `${value}℃`,
            label: 'Thermometer',
            relativeGaugeSize: true
        }),
        barometer: new JustGage({
            id: 'barometer',
            value: 0,
            min: 0,
            max: 100,
            textRenderer: (value) => `${value}%`,
            label: 'Pressure',
            relativeGaugeSize: true
        }),
        hydrometer: new JustGage({
            id: 'hydrometer',
            value: 0,
            min: 0,
            max: 100,
            textRenderer: (value) => `${value}%`,
            label: 'Humanity',
            relativeGaugeSize: true
        }),
        altimeter: new JustGage({
            id: 'altimeter',
            value: 0,
            min: 0,
            max: 200,
            textRenderer: (value) => `${value} m`,
            label: 'Altimeter',
            relativeGaugeSize: true
        })
    };

    const DISPLAYS = Object.keys(monitors);

    socket.on('report', (data) => {
        DISPLAYS.forEach((display) => {
            monitors[display].refresh(data[display]);
        });
    });
};
