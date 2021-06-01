module.exports.logRequest = function(req, res, next) {
    console.log(`
    Request Logger
    ==============
    Hostname: ${ req.hostname } 
    Url: ${ req.baseUrl }
    Path: ${ req.path }
    Body: ${ JSON.stringify(req.body) }
    Params: ${ JSON.stringify(req.params) }
    Query: ${ JSON.stringify(req.query) }
    `)
    next();
}