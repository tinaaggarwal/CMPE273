var mongoose = require('mongoose');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;
const orderIdSchema = new Schema({
    customer_order_id: {
        type: Schema.ObjectId
    },
    restaurant_order_id: {
        type: Schema.ObjectId
    }
});

const OrderId = mongoose.model("OrderId", orderIdSchema)

module.exports =  OrderId;
