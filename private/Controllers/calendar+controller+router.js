const controller = require('./calendar+controller');

var activeFunctions = [
    'forgot_password',
    'generate_api_key',
    'phone_registration',
    'session_check',
    'verify_api_key'
]

module.exports.routeRequest = function(request, response) {
    let action = request.body.action;

    if (!activeFunctions.includes(action)) {
        return controller.sendErrorResponse(request, response);
    }

    if (action == 'forgot_password') {
        controller.sendPasswordResetEmail(request, response);
    }

    if (action == 'session_check') {
        controller.sessionCheck(request, response);
    }

    if (action == 'phone_registration') {
        controller.phoneRegistration(request, response);
    }

    if (action == 'generate_api_key') {
        controller.generateAPIKey(request, response);
    }

    if (action == 'verify_api_key') {
        controller.verifyAPIKey(request, response);
    }
}