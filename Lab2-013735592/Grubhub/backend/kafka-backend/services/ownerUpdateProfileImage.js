var { Restaurants } = require('../models/restaurant');

function handle_request(msg, callback) {
    var res = {};

    Restaurants.findOneAndUpdate({
        _id: msg.owner_id
    },
        {
            profile_image: msg.profile_image
        },
        {
            new: true,
            runValidators: true,
            upsert: true,
            useFindAndModify: false
        },
        (err, result) => {
            if (err) {
                console.log('The owner is not valid');
                callback(err, null);
            }
            else {
                console.log('Owner profile_image added successfully', result);
                callback(null, result);
            }
        }
    );
}

exports.handle_request = handle_request;