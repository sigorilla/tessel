'use strict';

const got = require('got');

class IFTTTMaker {
    constructor(options) {
        this._token = options.token;
    }

    send(event, data) {
        const url = `https://maker.ifttt.com/trigger/${event}/with/key/${this._token}`;
        return got(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => true)
            .catch((error) => {
                console.error(error);
                return false;
            });
    }
}

module.exports = IFTTTMaker;
