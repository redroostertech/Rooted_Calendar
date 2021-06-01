const firebase = require('../../firebase').apps;
const randomstring = require('randomstring');

// MARK: - Retrieve Access Token
/**
 * Retrieves the users access token from the request headers
 * @param { Object } request - N/A
 */
function retrieveAccessTokenFrom(request) {
    return request.get('Authorization');
}
module.exports.retrieveAccessToken = retrieveAccessTokenFrom

// MARK: - Retrieve API Key
/**
 * Retrieves the api key from the request headers
 * @param { Object } request - N/A
 */
 function retrieveApiKeyFrom(request) {
    return request.get('x-api-key');
}
module.exports.retrieveApiKeyFrom = retrieveApiKeyFrom

// MARK: - Extract Access Token
/**
 * Extracts the users access token from the provided string
 * @param { String } bearerTokenValue - The value of the bearer token value from a given request header
 */
function extractTokenFrom(bearerTokenValue) {
    return bearerTokenValue.split(" ")[1]
}
module.exports.extractToken = extractTokenFrom

// MARK: - Validate Access Token
/**
 * Validates an access token through Firebase Admin module
 * @param { String } token
 * @param { Function } completionHandler
 */
function validate(token, completionHandler) {
    firebase.admin.auth().verifyIdToken(token).then((decodedToken) => {
        console.log(decodedToken);
        completionHandler(decodedToken);
    })
    .catch((error) => {
        console.log(error);
        completionHandler(null);
    });
}
module.exports.validateToken = validate

// MARK: - Login with email and password
/**
 * Logs a user in using the provided email and password
 * @param { String } token
 * @param { Function } completionHandler
 */
function loginUsing(email, password, callback) {
    firebase.core.auth().signInWithEmailAndPassword(email, password).then(function(error) {
        if (!error) return callback(error, null)
        callback(null, auth.currentUser);
    })
    .catch(function (error) {
        callback(error, null)
    });
}
module.exports.login = loginUsing

// MARK: - Send user password reset email
/**
 * Sends an email to the user for their forgotten password
 * @param { String } email
 * @param { Function } callback
 */
function sendPasswordResetEmail(email, callback) {
    firebase.core.auth().sendPasswordResetEmail(email).then(function() {
        callback(
            null,
            {
                "email_sent": true
            }
        )
    })
    .catch(function(error) {
        callback(error, null);
    });
}
module.exports.sendPasswordResetEmail = sendPasswordResetEmail

// MARK: - Send user password reset email
/**
 * Sends an email to the user for their forgotten password
 * @param { String } email
 * @param { Function } callback
 */
 function phoneRegistration(email, callback) {
    firebase.core.auth().sendPasswordResetEmail(email).then(function() {
        callback(
            null,
            {
                "email_sent": true
            }
        )
    })
    .catch(function(error) {
        callback(error, null);
    })
}
module.exports.phoneRegistration = phoneRegistration

// MARK: - Generates an API Key
/**
 * Generates an API key for a given integration
 * @param { Object } data
 * @param { Function } callback
 */
function generateAPIKey(data, callback) {
    data.apiKey = randomstring.generate(255);
    let collection = firebase.firestore.collection('AppIntegrations');
    collection
    .add(data)
    .then(function(documentReference) {
        let documentId = documentReference.id
        console.log("Document written with ID: ", documentId);
        if (!documentId) return callback(
            {
                message: "Document reference is empty"
            }, 
            null
        )
        data.documentId = documentId
        callback(null, data)
    })
    .catch(function (error) {
        callback(error, null); 
    });
}
module.exports.generateAPIKey = generateAPIKey

// MARK: - Verify API Key
/**
 * Generates an API key for a given integration
 * @param { String } apiKey
 * @param { Function } callback
 */
 function verifyAPIKey(apiKey, callback) {
    let collection = firebase.firestore.collection('AppIntegrations');
    collection
    .where('apiKey','==', apiKey)
    .get(firebase.getOptions)
    .then(function(querySnapshot) {
        if (querySnapshot.docs.length == 0) return callback(
            {
                message: "No data was returned."
            },
            null
        )
        let appIntegration = querySnapshot.docs[0]
        if (!appIntegration) return callback(
            {
                message: "Integration object is empty"
            }, 
            null
        )
        callback(
            null, 
            {
                didVerifyAPIKey: true
            }
        )
    })
    .catch(function (error) {
        callback(error, null); 
    });
}
module.exports.verifyAPIKey = verifyAPIKey