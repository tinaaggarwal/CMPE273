var mongoose = require('mongoose');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;
const clientSchema = mongoose.Schema({

    first_name :{
        type : String
    },
    last_name :{
        type : String
    },
    client_email :{
        type : String
    },
    password :{
        type: String
    },
    street_address :{
        type : String
    },
    apt :{
        type: String
    },
    city :{
        type : String
    },
    state :{
        type: String
    },
    zip_code :{
        type : String
    },
    phone :{
        type: String
    },
    cross_street :{
        type : String
    },
    delivery_instructions :{
        type: String
    },
    address_name :{
        type : String
    },
    profile_image :{
        type: String
    },
    orders :[{
        item: [{
            item_name : {
                type : String
            },
            item_quantity : {
                type : Number
            },
            item_total_price : {
                type : Number
            }
        }],
        restaurant_name :{
            type : String
        },
        status :{
            type: String
        },
        order_bill :{
            type: Number
        }
    }]
});

const Client = mongoose.model("Client", clientSchema)

module.exports =  {Client};
