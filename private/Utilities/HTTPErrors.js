const Codes = {
    ok: "ok",
    cancelled: "cancelled",
    unknown: "unknown",
    invalidArgument: "invalid-argument",
    deadlineExceeded: "deadline-exceeded",
    notFound: "not-found",
    alreadyExists: "already-exists",
    permissionDenied: "permission-denied",
    resourceExhausted: "resource-exhausted",
    failedPrecondition: "failed-precondition",
    aborted: "aborted",
    outOfRange: "out-of-range",
    unimplemented: "unimplemented",
    internal: "internal",
    unavailable: "unavailable",
    dataLoss: "data-loss",
    unauthenticated: "unauthenticated"
}

module.exports.codes = Codes

function generateHTTPSError(
    errorCode, 
    message
) {
    return {
        errorCode,
        message
    };
}

module.exports.generateHTTPSError = generateHTTPSError