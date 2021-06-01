'use strict';

const cors = require('cors');
const express = require('express');
const requestLogger = require('./private/Utilities/RequestLogger')
const appConfig = require('./configuration');
const app =  express();

app.use(
    cors(
        { 
            origin: true 
        }
    )
);

app.use(
    express.urlencoded(
        {
            limit: '500mb', 
            extended: true, 
            parameterLimit: 50000 
        }
    )
);

app.use(
    express.json(
        { 
            limit: '500mb' 
        }
    )
);

// MARK: - Middleware
app.use(requestLogger.logRequest);

// MARK: - Routes
app.use(
    '/api/v1/notifications', 
    require('./private/Routes/calendar+routes')
);

module.exports = {
    sharedInstance: app,
    config: appConfig
}