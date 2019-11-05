var { Client } = require('../models/client');

function handle_request(msg, callback) {
    var res = {};

    Client.findOneAndUpdate({
        _id: msg.client_id
    },
        {
            street_address: msg.street_address,
            apt: msg.apt,
            city: msg.city,
            state: msg.state,
            zip_code: msg.zip_code,
            phone: msg.phone,
            cross_street: msg.cross_street,
            delivery_instructions: msg.delivery_instructions,
            address_name: msg.address_name
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
                console.log('Client address updated successfully', result);
                callback(null, result);
            }
        }
    );
}

exports.handle_request = handle_request;