var { Client } = require('../models/client');

function handle_request(msg, callback) {
    var res = {};

    Client.findOneAndUpdate({
        _id: msg.client_id
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
                console.log('The user is not valid');
                callback(err, null);
            }
            else {
                console.log('Client profile_image added successfully', result);
                callback(null, result);
            }
        }
    );
}

exports.handle_request = handle_request;