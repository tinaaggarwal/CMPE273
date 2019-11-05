var { Client } = require('../models/client');
var { Restaurants } = require('../models/restaurant');
var _ = require('lodash');
var { mongoose } = require('../mongoose');

function handle_request(msg, callback) {
    console.log('req body', msg);
    var res = {};

    if (msg.type === 'Client') {
        Client.findOne({
            _id: msg.client_id,
            'orders._id': msg.orderIdToUpdate
        }).then(client => {
            const order = _.find(client.orders, (order) => order.id === msg.orderIdToUpdate);
            order.status = msg.status;
            client.save().then(() => {
                console.log('Order status for client updated Successfully')
                res.msg = "Order status for client updated Successfully";
                res.code = "200";
                callback(null, res);
            })
        }, (err) => {
            console.log('Error in updating order status for client');
            res.msg = "Error in updating order status for client";
            res.code = "400";
            callback(err, null);
        })
    } else {
        Restaurants.findOne({
            'orders._id': msg.orderIdToUpdate
        }).then(restaurant => {
            const order = _.find(restaurant.orders, (order) => order.id === msg.orderIdToUpdate);
            order.status = msg.status;
            restaurant.save().then(() => {
                console.log('Order status for owner updated Successfully')
                res.msg = "Order status for owner updated Successfully";
                res.code = "200";
                callback(null, res);
            })
        }, (err) => {
            console.log('Error in updating order status for owner');
            res.msg = "Error in updating order status for owner";
            res.code = "400";
            callback(err, null);
        })
    }
};

exports.handle_request = handle_request;