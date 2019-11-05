var { Client } = require('../models/client');

function handle_request(msg, callback) {
    var res = {};

    Client.findOneAndUpdate({
        _id: msg.client_id
    },
        {
            first_name: msg.first_name,
            last_name: msg.last_name
        },
        {
            new: true,
            runValidators: true,
            upsert: true,
            useFindAndModify: false
        },
        (err, result)=>{
            if(err){
                console.log('The user is not valid');
                callback(err, null);
            }
            else{
                console.log('Client name updated successfully', result);
                callback(null, result);
            }
        }
    );
}

exports.handle_request = handle_request;