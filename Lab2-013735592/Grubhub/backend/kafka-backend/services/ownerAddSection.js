var { Restaurants } = require('../models/restaurant');

function handle_request(msg, callback) {
    var res = {};

    Restaurants.findOneAndUpdate(
        {
            _id: msg.owner_id
        },
        {
            $push: {
                menu: {
                    section_name: msg.section_name,
                    section_description: msg.section_description
                }
            }
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
                console.log('Owner restaurant section added successfully', result);
                callback(null, result);
            }
        }
    );
}

exports.handle_request = handle_request;