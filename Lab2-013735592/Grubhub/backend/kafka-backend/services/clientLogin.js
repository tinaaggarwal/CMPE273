var { Client } = require('../models/client');
var { mongoose } = require('../mongoose');

function handle_request(msg, callback) {
    console.log('req body', msg);
    var res = {};
    Client.findOne({
        "client_email": msg.email
    }, (err, result) => {
        if (err) {
            console.log('Error in getting profile data');
            callback(err, null);
        }
        else if (result.password === msg.password) {
            console.log('Login successful');
            res.msg = "Login successful";
            res.code = 200;
            res.user = result;
            callback(err, res);
        }
        else {
            console.log("Invalid credentials");
            res.msg = "Invalid credentials";
            res.code = 400;
            callback(null, res);
        }
    }

    )
}

exports.handle_request = handle_request;