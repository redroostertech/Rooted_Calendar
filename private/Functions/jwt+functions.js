const jwt = require('jsonwebtoken');
const configs = require('../../app').config;

function verify(token, callback) {
    jwt.verify(
        token, 
        configs.jwtRefresh,
        (error, decoded) => {
            if (error) {
                callback(
                    error,
                    null
                )
            } 
            else {
                sign(
                    decoded.uid,
                    (err, customToken) => { 
                        if (err) {
                            callback(
                                err,
                                null
                            )
                        } 
                        else {
                            callback(
                                null,
                                customToken
                            )
                        }
                    }
                )
            }
        }   
    )
}
module.exports.verify = verify

function sign(uid, callback) {
    jwt.sign(
        { 
            uid: uid
        }, 
        jwtrefresh, 
        {
            expiresIn: configs.jwtRefreshLimit
        },
        (error, customToken) => { 
            if (error) {
                callback(
                    error,
                    null
                )
            } 
            else {
                callback(
                    null,
                    customToken
                )
            }
        }
    )
}
module.exports.sign = sign