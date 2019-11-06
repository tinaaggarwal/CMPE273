//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const validateRegisterInput = require('../validation/register');
var { Client } = require('../models/client');
const bcrypt = require('bcryptjs');
var { mongoose } = require('../mongoose');

function handle_request(msg, callback) {
    console.log('req body', msg);
    var res = {};
    Client.findOne({
        "client_email": msg.email
    }, (err, result) => {
        if (err) {
            console.log('Error in getting profile data');
            callback(err, null);
        }
        else if (result) {
            console.log('Profile data get success');
            console.log(result.client_email);
            res.msg = "duplicate user";
            res.code = 400;
            callback(err, res);
        }

        else {
            const first_name = msg.firstName;
            const last_name = msg.lastName;
            const client_email = msg.email;
            const password = msg.password;
            const street_address = null;
            const apt = null;
            const city = null;
            const state = null;
            const zip_code = null;
            const phone = null;
            const cross_street = null;
            const delivery_instructions = null;
            const address_name = null;
            const profile_image = null;
            const orders = [];

            const newClient = new Client({
                first_name,
                last_name,
                client_email,
                password,
                street_address,
                apt,
                city,
                state,
                zip_code,
                phone,
                cross_street,
                delivery_instructions,
                address_name,
                profile_image,
                orders
            })

            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    console.log("error received");
                    callback(err, "Error");
                }
                else {
                    bcrypt.hash(newClient.password, salt, (err, hash) => {
                        if (err) {
                            console.log("error received");
                            callback(err, "Error");
                        }

                        else {
                            console.log("inside last else");
                            newClient.password = hash;
                            newClient
                                .save()
                                .then(client => {
                                    res.msg = "Client created successfully";
                                    res.code = 200;
                                    callback(null, res);
                                });
                        }
                    });
                }
            });
        }
    }

    )
}

exports.handle_request = handle_request;