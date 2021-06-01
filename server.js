const http = require('http');
const app = require('./app');
const Firebase = require('./firebase');
const config = app.config;

var server = http.createServer(app.sharedInstance);
server.setTimeout(config.timeout);
server.timeout = config.timeout;
server.agent = false;

module.exports.setupServer = function() {
    server.listen(
        config.port, 
        function() {
            console.log(config.applicationTitle + ' running on port: ' + config.port + '.');
        }
    );
};