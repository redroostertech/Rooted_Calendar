function logMessage(success, results, error) {
    console.log(`
    Response Handler
    ==============
    Success: ${ success }
    Results: ${ JSON.stringify(results) }
    Error: ${ error }
    `)
}

module.exports.sendResponse = function(
    success, 
    results, 
    error,
    res
){
    logMessage(success, results, error);

    return res.json(
        {
            status: 200,
            success: success,
            data: results,
            error_message: error
        }
    )
}

module.exports.sendErrorResponse = function(
    success, 
    results, 
    error,
    res
){
    logMessage(success, results, error);

    return res
    .status(404)
    .json(
        {
            status: 404,
            success: success,
            data: results,
            error_message: error
        }
    )
}