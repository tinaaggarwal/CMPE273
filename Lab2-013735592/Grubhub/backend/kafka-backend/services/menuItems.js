var { Restaurants } = require('../models/restaurant');
var { mongoose } = require('../mongoose');

function handle_request(msg, callback) {
    console.log('req body', msg);

    Restaurants.findOne({
        _id: msg.r_id
    }, (err, result)=>{
        if(err){
            console.log('Error in getting restaurant menu data');
            callback(err, null);
        }
        else{
            console.log('Restaurant menu data get succesuful', result.menu);
            callback(null, result.menu);
        }
    });
};

exports.handle_request = handle_request;