var mongoose = require('mongoose');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;
const restaurantsSchema = new Schema({
    
    first_name :{
        type : String
    },
    last_name :{
        type : String
    },
    owner_email :{
        type : String
    },
    restaurant_name :{
        type : String
    },
    zip_code :{
        type : String
    },
    password :{
        type: String
    },
    profile_image :{
        type : String
    },
    phone :{
        type : String
    },
    rest_image :{
        type : String
    },
    cuisine :{
        type : String
    },
    menu :[{
        section_name :{
            type : String
        },
        section_description :{
            type: String
        },
        item: [{
            item_name : {
                type : String
            },
            item_description : {
                type : String
            },
            item_image : {
                type : String
            },
            item_price : {
                type : Number
            }
        }]
    }],
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
        client_email :{
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

const Restaurants = mongoose.model("Restaurants", restaurantsSchema)

module.exports = Restaurants;