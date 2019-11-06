var { Restaurants } = require('../models/restaurant');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var { mongoose } = require('../mongoose');

function handle_request(msg, callback) {
    console.log('req body', msg);
    var res = {};
    Restaurants.findOne({
        "owner_email": msg.email
    }, (err, result) => {
        if (err) {
            console.log('Error in getting profile data');
            callback(err, null);
        }

        bcrypt.compare(msg.password, result.password)
            .then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: result._id,
                        email: result.owner_email,
                    }
                    jwt.sign(payload, 'secret', {
                        expiresIn: 3600
                    }, (err, token) => {
                        if (err) {
                            console.error('There is some error in token', err);
                            callback(err, []);
                        }
                        else {
                            callback(null, {
                                success: true,
                                payload: payload,
                                token: `Bearer ${token}`
                            });
                        }
                    });
                }
                else {
                    console.log("Invalid credentials");
                    res.msg = "Invalid credentials";
                    res.code = 400;
                    callback(null, res);
                }
            });
    }

    )
}

exports.handle_request = handle_request;