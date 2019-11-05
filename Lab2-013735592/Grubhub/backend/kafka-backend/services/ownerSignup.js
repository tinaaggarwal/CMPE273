//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const validateRegisterInput = require('../validation/register');
var { Restaurants } = require('../models/restaurant');
var { mongoose } = require('../mongoose');

function handle_request(msg, callback) {
    console.log('req body', msg);
    var res = {};
    Restaurants.findOne({
        "owner_email": msg.email
    }, (err, result) => {
        if (err) {
            console.log('Error in getting profile data');
            callback(err, null);
        }
        else if (result) {
            console.log('Profile data get success');
            console.log(result.owner_email);
            res.msg = "duplicate user";
            res.code = 400;
            callback(err, res);
        }
        else {
            const first_name = msg.firstName;
            const last_name = msg.lastName;
            const owner_email = msg.email;
            const restaurant_name = msg.restaurantName;
            const zip_code = msg.restaurantZipCode;
            const password = msg.password;
            const profile_image = null;
            const phone = null;
            const rest_image = null;
            const cuisine = null;
            const menu = [];
            const orders = [];

            const newOwner = new Restaurants({
                first_name,
                last_name,
                owner_email,
                restaurant_name,
                zip_code,
                password,
                profile_image,
                phone,
                rest_image,
                cuisine,
                menu,
                orders
            })

            newOwner.save().then((owner) => {
                console.log('Profile data insert success');
                res.msg = "Owner created successfully";
                res.code = 200;
                callback(null, res);
            }, (err) => {
                console.log('Error in creating user');
                callback(err, null);
            });
        }
    }

    )
}

exports.handle_request = handle_request;