'use strict';

const os = require('os');

const {Motors} = require('johnny-five');

const SocketIO = require('socket.io');

require('./board')(onReady);

const server = require('./server');
const io = new SocketIO(server);

const PORT = 80;

function onReady() {
    const clients = new Set();

    const motors = new Motors([
        ['a5', 'a4', 'a3'],
        ['b5', 'b4', 'b3']
    ]);

    io.on('connection', (socket) => {
        if (clients.size < 5) {
            clients.add(socket);
            socket.on('disconnect', () => clients.delete(socket));
        }

        socket.on('start', () => {
            motors.start();
        });

        socket.on('stop', () => {
            motors.stop();
        });

        socket.on('change speed', (value) => {
            motors.speed(value);
        });

        socket.on('change direction', (direction) => {
            switch (direction) {
                case 'forward':
                    motors.stop().forward();
                    break;
                case 'reverse':
                    motors.stop().reverse();
                    break;
            }
        });

        socket.on('move', ({speed, rotateDir, rotateK}) => {
            const isLeft = rotateDir === 1;
            const rotateSpeed = rotateK * speed;
            [
                isLeft ? rotateSpeed : speed,
                !isLeft ? rotateSpeed : speed
            ].forEach((speed, index) => {
                motors[index].speed(speed);
            });
        });
    });

    server.listen(PORT, () => {
        console.log(`Server started, go to http://${os.hostname()}`);
    });

    process.on('SIGINT', () => server.close());
}
