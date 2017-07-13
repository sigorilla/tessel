window.onload = () => {
    const socket = io();
    const monitor = {};

    monitor.thermometer = new JustGage({
        id: 'thermometer',
        value: 10,
        min: 0,
        max: 100,
        title: 'Thermometer',
        label: 'Celsius',
        relativeGaugeSize: true
    });
    monitor.barometer = new JustGage({
        id: 'barometer',
        value: 10,
        min: 0,
        max: 100,
        title: 'Barometer',
        label: 'Pressure',
        relativeGaugeSize: true
    });
    monitor.hydrometer = new JustGage({
        id: 'hydrometer',
        value: 10,
        min: 0,
        max: 100,
        title: 'hydrometer',
        label: 'Humanity',
        relativeGaugeSize: true
    });
    monitor.altimeter = new JustGage({
        id: 'altimeter',
        value: 10,
        min: 0,
        max: 100,
        title: 'Altimeter',
        label: 'Meters',
        relativeGaugeSize: true
    });

    const DISPLAYS = Object.keys(monitor);

    socket.on('report', (data) => {
        DISPLAYS.forEach((display) => {
            monitor[display].refresh(data[display]);
        });
    });
};
