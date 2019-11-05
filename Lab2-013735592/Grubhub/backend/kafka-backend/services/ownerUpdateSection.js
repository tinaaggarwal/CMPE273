var { Restaurants } = require('../models/restaurant');

function handle_request(msg, callback) {
    var res = {};

    Restaurants.updateOne(
        {
            'menu._id': msg.section_id
        },
        {
            '$set':
            {
                'menu.$.section_name': msg.section_name,
                'menu.$.section_description': msg.section_description
            }
        },
        (err, result) => {
            if (err) {
                console.log('The restaurant is not valid');
                callback(err, null);
            }
            else {
                console.log('Owner restaurant section updated successfully', result);
                callback(null, result);
            }
        }
    );
}

exports.handle_request = handle_request;