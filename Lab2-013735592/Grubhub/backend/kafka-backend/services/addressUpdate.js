var { Client } = require('../models/client');
var { mongoose } = require('../mongoose');

function handle_request(msg, callback) {
    console.log('req body', msg);

    Client.findOne({
        _id: msg
    }, (err, result)=>{
        if(err){
            console.log('Error in getting user data');
            callback(err, null);
        }
        else{
            console.log('User address data get succesuful', result);
            callback(null, result);
        }
    });
};

exports.handle_request = handle_request;