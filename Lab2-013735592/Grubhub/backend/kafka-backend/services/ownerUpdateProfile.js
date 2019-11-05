var { Restaurants } = require('../models/restaurant');

function handle_request(msg, callback) {
    var res = {};

    Restaurants.findOneAndUpdate({
        _id: msg.owner_id
    },
        {
            first_name: msg.first_name,
            last_name: msg.last_name,
            owner_email: msg.owner_email,
            phone: msg.phone,
            restaurant_name: msg.restaurant_name,
            cuisine: msg.cuisine
        },
        {
            new: true,
            runValidators: true,
            upsert: true,
            useFindAndModify: false
        },
        (err, result) => {
            if (err) {
                console.log('The restaurant is not valid');
                callback(err, null);
            }
            else {
                console.log('Owner profile updated successfully', result);
                callback(null, result);
            }
        }
    );
}

exports.handle_request = handle_request;