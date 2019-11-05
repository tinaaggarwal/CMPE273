var { Restaurants } = require('../models/restaurant');
var { Client } = require('../models/client');
var _ = require('lodash');

function handle_request(msg, callback) {
    var res = {};

    Restaurants.findOne({
        _id: msg.r_id
    }).then(restaurant => {
        Client.findOne({
            _id: msg.client_id
        }).then(client => {
            restaurant.orders.push({
                item: msg.item,
                client_email: client.client_email,
                status: 'New',
                order_bill: msg.order_bill
            });
            restaurant.save().then(() => {
                client.orders.push({
                    item: msg.item,
                    restaurant_name: restaurant.restaurant_name,
                    status: 'New',
                    order_bill: msg.order_bill
                });
                client.save().then(() => {
                    console.log('Order submitted Successfully')
                    res.msg = "Order submitted Successfull";
                    res.code = "200";
                    callback(null, res);
                })

            })

        }, (err) => {
            console.log('Error in submitting order user');
            res.msg = "Error in submitting order user";
            res.code = "400";
            callback(err, null);
        });
    });
}

exports.handle_request = handle_request;