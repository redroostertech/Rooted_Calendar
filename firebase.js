'use strict';

const firebase = require('firebase');
const admin = require('firebase-admin');
const configs = require('./configuration');
const FCM = require('fcm-node');
const { Storage }  = require('@google-cloud/storage');

require("firebase/auth");
require("firebase/database");
require("firebase/messaging");
require("firebase/functions");
require("firebase/storage");
require("firebase/firestore");

const firApiKey = process.env.firApiKey || configs.firApiKey;
const firAuthDomain = process.env.firAuthDomain || configs.firAuthDomain;
const firDbUrl = process.env.firDbUrl || configs.firDbUrl;
const firProjectId = process.env.firProjectId || configs.firProjectId;
const firStorageBucket = process.env.firStorageBucket || configs.firStorageBucket;
const firMessagingSenderId = process.env.firMessagingSenderId || configs.firMessagingSenderId;
const firStorageFilename = process.env.firStorageFilename || configs.firStorageFilename;
const serviceAccount = require(firStorageFilename);

const settings = { 
    timestampsInSnapshots: true 
};

const getOptions = { 
    source: 'cache' 
};

//  MARK:- Setup Firebase App
var firebaseObj;
var firebaseAdmin;
var firbaseStorage;
var firebaseFirestoreDB; 
var firebaseRealtimeDB;

const firebaseConfiguration = {
    apiKey: firApiKey,
    authDomain: firAuthDomain,
    databaseURL: firDbUrl,
    projectId: firProjectId,
    storageBucket: firStorageBucket,
    messagingSenderId: firMessagingSenderId,
};

function setupFirebaseApp(callback) {
    if (!firebase.apps.length) {
        firebaseObj = firebase.initializeApp(firebaseConfiguration);
    } else {
        firebaseObj = firebase.app();
    }
    callback();
}

function setupAdminFirebaseApp(callback) {
    firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: firDbUrl,
        storageBucket: firStorageBucket
    });
    callback();
}

function setupRealtimeDB(callback) {
    firebaseRealtimeDB = firebase.database();
    callback();
}

function setupFirestoreDB(callback) {
    firebaseFirestoreDB = admin.firestore()
    firebaseFirestoreDB.settings(settings);
    callback();
}

function setupFirebaseStorage(callback) {
    firbaseStorage = new Storage({
        projectId: firProjectId,
        keyFilename: firStorageFilename
    });
    firbaseStorage.bucket(firStorageBucket)
    callback();
}

function initializeFirebase() {
    console.log('Setting up Firebase');
    setupFirebaseApp(function() {
        console.log('Completed setting up base firebase app');
    });
    setupAdminFirebaseApp(function() {
        console.log('Completed setting up base firebase admin app');
    });
    setupRealtimeDB(function() {
        console.log('Completed setting up base realtime db');
    });
    setupFirestoreDB(function() {
        console.log('Completed setting up base firebase firestore db');
    });
    setupFirebaseStorage(function() {
        console.log('Completed setting up base firebase storage app');
    });
}

initializeFirebase();

module.exports.apps = {
    core: firebaseObj,
    admin: firebaseAdmin,
    storage: firbaseStorage,
    firestore: firebaseFirestoreDB,
    realtime: firebaseRealtimeDB,
    getOptions: getOptions
}