var { Restaurants } = require('../models/restaurant');
var { mongoose } = require('../mongoose');

function handle_request(msg, callback) {
    console.log('req body', msg);

    Restaurants.find({
    }, (err, result)=>{
        if(err){
            console.log('Error in getting user data');
            callback(err, null);
        }
        else{
            console.log('Get list of restaurants succesuful', result);
            callback(null, result);
        }
    });
};

exports.handle_request = handle_request;