const authFunctions = require('../Functions/calendar+functions');
const requestLogger = require('../Utilities/RequestLogger');
const responseHandler = require('../Utilities/ResponseHandler');
const HTTPsErrorCode = require('../Utilities/HTTPErrors');

var shouldVerifyTokens = true;

module.exports.authFunctions = authFunctions

function createError(code, message) {
    return HTTPsErrorCode.generateHTTPSError(
        code, 
        message
    );
}

// MARK: - Verify Access Token
/**
 * Verifies the users access token
 * @param { Object } request - N/A
 * @param { Object } response - N/A
 * @param { Function } next - N/A
 */
function verifyAccessToken(request, response, next) {
    if (shouldVerifyTokens) {
        // let accessToken = authFunctions.retrieveAccessToken(request)
        let accessToken = request.body.accessToken
        if (accessToken == undefined) {
            responseHandler.sendResponse(
                false, 
                null, 
                createError(
                    HTTPsErrorCode.codes.unauthenticated,
                    "Access token is invalid."
                ),
                response
            )
        }
        else {
            authFunctions.validateToken(
                accessToken, 
                function(decodedToken) {
                    if (!decodedToken) {
                        request.body.extractedUID = decodedToken.uid;
                        next();
                    }
                    else {
                        responseHandler.sendResponse(
                            true, 
                            {
                                shouldRefreshAccessToken: true
                            }, 
                            null,
                            response
                        )
                    }
                }   
            )
        }
    }
    else {
        next();
    }
}

module.exports.verifyAccessToken = verifyAccessToken

// MARK: - Generate Token
/**
 * Generates a new token for user
 * @param { Object } request - N/A
 * @param { Object } response - N/A
 * @param { Function } next - N/A
 */
function generateToken(request, response, next) {
    let uid = request.body.userUID;
    if (!uid) return responseHandler.sendResponse(
        false, 
        null, 
        createError(
            HTTPsErrorCode.codes.unauthenticated,
            "UID is undefined."
        ),
        response
    )
    authFunctions.generateToken(
        uid, 
        function(error, token) {
            if (!error) {
                console.log(uid);
                request.body.token = token
                next();
            }
            else {
                responseHandler.sendResponse(
                    false, 
                    null, 
                    error,
                    response
                )
            }
        }
    );
}

module.exports.generateToken = generateToken