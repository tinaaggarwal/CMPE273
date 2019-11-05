var { Restaurants } = require('../models/restaurant');
var _ = require('lodash');

function handle_request(msg, callback) {
    var res = {};

    Restaurants.findOne({
        _id: msg.owner_id,
    }).then(restaurant => {
        const section = _.find(restaurant.menu, (section) => section.id === msg.section_id)
        section.item.push({
            item_name: msg.item_name,
            item_description: msg.item_description,
            item_image: msg.item_image,
            item_price: msg.item_price
        })
        restaurant.save().then(() => {
            console.log('Item added Successfully')
            res.msg = "Item added Successfully";
            res.code = "200";
            callback(null, res);
        }, (err) => {
            res.code = "400";
            console.log('Error in creating user');
            callback(err, null);
        })
    
    })
}

exports.handle_request = handle_request;