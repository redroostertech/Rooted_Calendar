const AuthFunctions = require('../Functions/calendar+functions');
const ResponseHandler = require('../Utilities/ResponseHandler');
const ErrorHandler = require('../Utilities/HTTPErrors');
const jwt = require('../Functions/jwt+functions');
const { authFunctions } = require('../Middleware/calendar+middleware');

// MARK: - Unsecure Endpoints
function sendErrorResponse(request, response) {
    ResponseHandler.sendErrorResponse(
        false,
        null,
        "Something went wrong. Please try again.",
        response
    )
}
module.exports.sendErrorResponse = sendErrorResponse

function sendPasswordResetEmail(request, response) {
    let email = request.body.email;

    if (!email) return ResponseHandler.sendResponse(
        false,
        null,
        "Email or password are invalid. Please try again.",
        response
    )

    AuthFunctions.sendPasswordResetEmail(
        email, 
        function(error, results) {
            if (error) return ResponseHandler.sendResponse(
                false,
                null,
                error.message,
                response
            )

            ResponseHandler.sendResponse(
                false,
                results,
                null,
                response
            )
        }
    )
}
module.exports.sendPasswordResetEmail = sendPasswordResetEmail

function phoneRegistration(request, response) {
    let phone_number = req.body.phone_number;
    let public_key_string = req.body.public_key_string;
    let private_key_encrypted_string = req.body.private_key_encrypted_string;
    let uid = req.body.uid;

    if (!phone_number || !uid)  return ResponseHandler.sendResponse(
        false,
        null,
        "1 or more parameters are missing. Please try again.",
        response
    )

    jwt.sign(
        uid,
        (error, customToken) => {
            if (error) return ResponseHandler.sendResponse(
                false,
                null,
                error.message,
                response
            )

            if (!customToken) return ResponseHandler.sendResponse(
                false,
                null,
                error.message,
                response
            )

            // Update user object with new token    
            ResponseHandler.sendResponse(
                false,
                null,
                {
                    token: customToken
                },
                response
            )
        }
    );
}
module.exports.phoneRegistration = phoneRegistration

function verifyAPIKey(request, response) {
    let apiKey = authFunctions.retrieveApiKeyFrom(request);
    if (!apiKey) return ResponseHandler.sendResponse(
        false,
        null,
        "API Key is empty. Please provide one.",
        response
    )

    authFunctions.verifyAPIKey(apiKey, function(error, didVerifyAPIKey) {
        if (error) return ResponseHandler.sendResponse(
            false,
            null,
            error.message,
            response
        )

        ResponseHandler.sendResponse(
            true,
            {
                didVerifyAPIKey: true
            },
            null,
            response
        )
    });
}
module.exports.verifyAPIKey = verifyAPIKey

// MARK: - Secure Endpoints
function sessionCheck(request, response) {
    let token = request.body.token;
    let uid = request.body.uid;

    if (!token || !uid) return ResponseHandler.sendResponse(
        false,
        null,
        "1 or more parameters are missing. Please try again.",
        response
    )

    jwt.verify(
        token,
        (error, customToken) => {
            if (error) return ResponseHandler.sendResponse(
                false,
                null,
                error.message,
                response
            )

            if (!customToken) return ResponseHandler.sendResponse(
                false,
                null,
                error.message,
                response
            )

            // Update user object with new token    

            ResponseHandler.sendResponse(
                false,
                null,
                {
                    token: customToken
                },
                response
            )
        }
    );
}
module.exports.sessionCheck = sessionCheck

function generateAPIKey(request, response) {
    let app_name = request.body.app_name;
    let app_owner = request.body.uid;
    let bundle_identifier_optional = request.body.bundle_identifier;

    if (!app_owner) return ResponseHandler.sendResponse(
        false,
        null,
        "You must be logged in to add this integration",
        response
    )

    if (!app_name)  return ResponseHandler.sendResponse(
        false,
        null,
        "An app name was not provided for this integration.",
        response
    )

    var data = {
        appName: app_name,
        owner: app_owner
    }

    if (bundle_identifier_optional) {
        data.bundleIdentifier = bundle_identifier_optional
    }

    AuthFunctions.generateAPIKey(
        data, 
        function(error, object) {
            if (error) return ResponseHandler.sendResponse(
                false,
                null,
                error.message,
                response
            )

            ResponseHandler.sendResponse(
                true,
                object,
                null,
                response
            )
        }
    )
}
module.exports.generateAPIKey = generateAPIKey