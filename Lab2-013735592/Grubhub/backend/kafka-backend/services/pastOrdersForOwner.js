var { Restaurants } = require('../models/restaurant');
var { mongoose } = require('../mongoose');

function handle_request(msg, callback) {
    console.log('req body', msg);

    Restaurants.findOne({
        _id: msg
    }, (err, result) => {
        if (err) {
            console.log('Error in getting user data');
            callback(err, null);
        }
        else {
            console.log('Get owner past orders list successful', result);
            let past = result.orders.filter(order => order.status === 'Delivered' || order.status === 'Cancelled')
            console.log('past orders...', past);
            callback(null, past);
        }
    });
};

exports.handle_request = handle_request;