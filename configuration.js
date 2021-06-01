'use strict';

const path = require('path');

const port = 3000;
const application_title = 'Rooted Calendar App';

const jwt_secret = 'akbeflkjbefsklebr4geos87gro8diuxbfgiuoehg487gso87eg4rkausebr4hjbteg8her89gr';
const jwt_secret_limit = 86400000;
const jwt_refresh = 'fbeywbai3w987gt784gweiosug4o87gtosuibrbkjtesbrilgegr78g78rgeksuirb';
const jwt_refresh_limit = 1814400000;

const fir_api_key = 'AIzaSyC8-wum1nrL4NkL4GHJJmhfBcpQyG1ZDIA';
const fir_auth_domain = 'rooted-test.firebaseapp.com';
const fir_db_url = 'https://rooted-test.firebaseio.com';
const fir_project_id = 'rooted-test';
const fir_storage_bucket = 'rooted-test.appspot.com';
const fir_messaging_sender_id = '316478127099';
const fir_app_id = '1:316478127099:web:61ce489a39d6fdad02a95e';
const fir_measurement_id = 'G-BGB70ZYWQV';

const is_live = false;
const one_day = 86400000;
const timeout = 72000000;

var fir_storage_filename;
if (is_live) {
    fir_storage_filename = './rooted-f677e-7249c753c9f9.json';
} else {
    fir_storage_filename = './rooted-test-7d1b0827d760.json';
}

module.exports = {
    port: port,
    applicationTitle: application_title,

    jwtSecret: jwt_secret,
    jwtSecretLimit: jwt_secret_limit,
    jwtRefresh: jwt_refresh,
    jwtRefreshLimit: jwt_refresh_limit,

    firApiKey: fir_api_key,
    firAuthDomain: fir_auth_domain,
    firDbUrl: fir_db_url,
    firProjectId: fir_project_id,
    firStorageBucket: fir_storage_bucket,
    firMessagingSenderId: fir_messaging_sender_id,
    firStorageFilename: fir_storage_filename,
    firAppId: fir_app_id,
    firMeasurementId: fir_measurement_id,
    
    isLive: is_live,
    oneDay: one_day,
    timeout: timeout
}