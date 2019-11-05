var { Restaurants } = require('../models/restaurant');
var { mongoose } = require('../mongoose');

function handle_request(msg, callback) {
    console.log('req body', msg);

    Restaurants.findOne({
        _id: msg
    }, (err, result)=>{
        if(err){
            console.log('Error in getting owner data');
            callback(err, null);
        }
        else{
            console.log('User owner get succesuful', result);
            callback(null, result);
        }
    });
};

exports.handle_request = handle_request;