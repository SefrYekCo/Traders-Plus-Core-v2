// blockRunflare.js
const http = require('http');
const https = require('https');

const BLOCKED_HOSTS = ['server.runflare.run', '188.40.16.3'];

function overrideRequest(module) {
    const originalRequest = module.request;

    module.request = function (options, callback) {
        let hostname = options.hostname || options.host;

        if (BLOCKED_HOSTS.includes(hostname)) {
            const err = new Error(`Blocked request to ${hostname}`);
            console.warn(err.message);
            if (callback) callback(err);
            const req = new http.ClientRequest(options);
            process.nextTick(() => req.emit('error', err));
            return req;
        }

        return originalRequest.call(module, options, callback);
    };
}

overrideRequest(http);
overrideRequest(https);
