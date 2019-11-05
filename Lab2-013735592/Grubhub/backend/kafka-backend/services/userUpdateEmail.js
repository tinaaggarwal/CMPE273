var { Client } = require('../models/client');

function handle_request(msg, callback) {
    var res = {};

    Client.findOneAndUpdate({
        _id: msg.client_id
    },
        {
            client_email: msg.client_email
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
                console.log('Client email updated successfully', result);
                callback(null, result);
            }
        }
    );
}

exports.handle_request = handle_request;