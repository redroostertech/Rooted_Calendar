const router = require('express').Router()
const controller = require('../Controllers/calendar+controller+router')

router.post('/leo', controller.routeRequest);

module.exports = router;