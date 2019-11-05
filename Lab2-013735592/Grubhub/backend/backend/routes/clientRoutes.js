var express = require('express');
var app = express();
const router = require('express').Router();
let Client = require('../models/client');
var _ = require('lodash');
let Restaurants = require('../models/restaurant');
var kafka = require('../kafka/client');
let client_id = '';

// Find - Mongoose method that gets the list of all users from MongoDB Atlas
// router.route('/').get((req, res) => {
//     Client.find()
//     .then(client => res.json(client))
//     .catch(err => res.status(400).json('Error: '+err));
// });

router.route('/clientSignup').post((req, res) => {

    kafka.make_request('client_signup', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Error");
        } else if (results.code === 400) {
            console.log("hello:", results);
            res.status(400).send(results.msg);
        }
        else if (results.code === 200) {
            console.log("success");

            res.status(200).send(results.msg);

        }

    });
});


router.route('/clientLogin').post((req, res) => {

    kafka.make_request('client_login', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Error");
        } else if (results.code === 400) {
            console.log("hello:", results);
            res.status(400).send(results.msg);
        }
        else if (results.code === 200) {
            console.log("success");
            req.session.user = results.user;
            console.log(req.session.user._id);
            client_id = req.session.user._id;
            res.status(200).send(results.msg);
        }
    });
});

router.route('/userUpdate').get((req, res) => {
    console.log('Inside user update fetch client profile')
    console.log(client_id);

    kafka.make_request('user_update', client_id, function (err, results) {
        console.log('in result of user update');

        if (err) {
            console.log('Unable to get user details', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in get connections');
        }
        else {
            console.log('Get user data sucesssful.', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }

    });
})

router.route('/userUpdateName').post((req, res) => {
    console.log("Inside Update name Handler");
    const { first_name, last_name } = req.body;

    let msg = {
        first_name: first_name,
        last_name: last_name,
        client_id: client_id
    }
    kafka.make_request('user_update_name', msg, function (err, results) {
        console.log('in result');
        console.log(results);

        if (err) {
            console.log('Unable to get user details, The user is not valid', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('The user is not valid');
        }
        else {
            console.log('Client name updated successfully', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }
    });
})

router.route('/userUpdateEmail').post((req, res) => {
    console.log("Inside Update email Handler");
    const { client_email } = req.body;

    let msg = {
        client_email: client_email,
        client_id: client_id
    }
    kafka.make_request('user_update_email', msg, function (err, results) {
        console.log('in result');
        console.log(results);

        if (err) {
            console.log('Unable to get user details, The user is not valid', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('The user is not valid');
        }
        else {
            console.log('Client email updated successfully', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }
    });
})

router.route('/userUpdatePassword').post((req, res) => {
    console.log("Inside Update password Handler");
    const { newPassword, confirmPassword } = req.body;


    let msg = {
        newPassword: newPassword,
        client_id: client_id
    }
    kafka.make_request('user_update_password', msg, function (err, results) {
        console.log('in result');
        console.log(results);

        if (err) {
            console.log('Unable to get user details, The user is not valid', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('The user is not valid');
        }
        else {
            console.log('Client password updated successfully', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }
    });
})

router.route('/addressUpdate').get((req, res) => {
    console.log('Inside client address profile part')
    console.log(client_id);

    kafka.make_request('address_update', client_id, function (err, results) {
        console.log('in result of user update');

        if (err) {
            console.log('Unable to get user details', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in get connections');
        }
        else {
            console.log('Get user address data sucesssful.', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }

    });
});

router.route('/userAddAddress').post((req, res) => {
    console.log("Inside Add user address Handler");
    const { street_address, apt, city, state, zip_code, phone, cross_street, delivery_instructions, address_name } = req.body;
    
    let msg = {
        street_address: street_address,
        apt: apt,
        city: city,
        state: state,
        zip_code: zip_code,
        phone: phone,
        cross_street: cross_street,
        delivery_instructions: delivery_instructions,
        address_name: address_name,
        client_id: client_id
    }
    kafka.make_request('user_add_address', msg, function (err, results) {
        console.log('in result');
        console.log(results);

        if (err) {
            console.log('Unable to get user details, The user is not valid', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('The user is not valid');
        }
        else {
            console.log('Client address added successfully', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }
    });
})

router.route('/userUpdateAddress').post((req, res) => {
    console.log("Inside Add user address Handler");
    const { street_address, apt, city, state, zip_code, phone, cross_street, delivery_instructions, address_name } = req.body;
    
    let msg = {
        street_address: street_address,
        apt: apt,
        city: city,
        state: state,
        zip_code: zip_code,
        phone: phone,
        cross_street: cross_street,
        delivery_instructions: delivery_instructions,
        address_name: address_name,
        client_id: client_id
    }
    kafka.make_request('user_update_address', msg, function (err, results) {
        console.log('in result');
        console.log(results);

        if (err) {
            console.log('Unable to get user details, The user is not valid', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('The user is not valid');
        }
        else {
            console.log('Client address updated successfully', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }
    });
})

router.route('/userUpdateProfileImage').post((req, res) => {
    console.log("Inside Update profile image Handler");
    const { profile_image } = req.body;

    let msg = {
        profile_image: profile_image,
        client_id: client_id
    }
    kafka.make_request('user_update_profile_image', msg, function (err, results) {
        console.log('in result');
        console.log(results);

        if (err) {
            console.log('Unable to get user details, The user is not valid', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('The user is not valid');
        }
        else {
            console.log('Client profile_image added successfully', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }
    });
})

router.route('/restaurantList').get((req, res) => {
    console.log('Inside get restaurant list Request Handler')

    kafka.make_request('restaurant_list', client_id, function (err, results) {
        console.log('in result of user update');

        if (err) {
            console.log('Unable to get user details', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in get connections');
        }
        else {
            console.log('Get list of restaurants succesuful.', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }

    });
});

router.route('/menuItems').post((req, res) => {
    console.log('r_id  :   ', req.body.r_id)
    console.log('Inside get menu items list Request Handler')


    let msg = {
        r_id: req.body.r_id
    }

    kafka.make_request('menu_items', msg, function (err, results) {
        console.log('in result');
        console.log(results);

        if (err) {
            console.log('Unable to get restaurant details, The restaurant is not valid', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('The restaurant is not valid');
        }
        else {
            console.log('Get list of menu items for a restaurant successful', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }
    });
});

router.route('/submitOrder').post((req, res) => {
    console.log('r_id  :   ', req.body.r_id)
    console.log('Inside submit order Request Handler')
    Restaurants.findOne({
        _id: req.body.r_id
    }).then(restaurant => {
        Client.findOne({
            _id: client_id
        }).then(client => {
            restaurant.orders.push({
                item: req.body.item,
                client_email: client.client_email,
                status: 'New',
                order_bill: req.body.cart_totalPrice
            });
            restaurant.save().then(() => {
                client.orders.push({
                    item: req.body.item,
                    restaurant_name: restaurant.restaurant_name,
                    status: 'New',
                    order_bill: req.body.cart_totalPrice
                });
                client.save().then(() => {
                    res.code = "200";
                    res.send('Order placed');
                })
            })

        })

    }).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/upcomingOrdersForClient').get((req, res) => {
    console.log('Inside get upcoming orders list for client Request Handler')
    
    kafka.make_request('upcoming_orders_for_client', client_id, function (err, results) {
        console.log('in result of user update');

        if (err) {
            console.log('Unable to get user details', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in get connections');
        }
        else {
            console.log('Get list of upcoming orders for client succesuful.', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }

    });
});

router.route('/pastOrdersForClient').get((req, res) => {
    console.log('Inside get past orders list for client Request Handler')

    kafka.make_request('past_orders_for_client', client_id, function (err, results) {
        console.log('in result of user update');

        if (err) {
            console.log('Unable to get user details', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in get connections');
        }
        else {
            console.log('Get list of past orders for client succesuful.', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }

    });
});


router.route('/updateOrderStatus').post((req, res) => {
    console.log('Inside update status Request Handler');
    console.log('req.body...', req.body);
    if (req.body.type === 'Client') {
        Client.findOne({
            _id: client_id,
            'orders._id': req.body.orderIdToUpdate
        }).then(client => {
            const order = _.find(client.orders, (order) => order.id === req.body.orderIdToUpdate);
            order.status = req.body.status;
            client.save().then(() => {
                res.code = "200";
                res.send('Order status updated');
            })
        })
    } else {
        Restaurants.findOne({
            'orders._id': req.body.orderIdToUpdate
        }).then(restaurant => {
            const order = _.find(restaurant.orders, (order) => order.id === req.body.orderIdToUpdate);
            order.status = req.body.status;
            restaurant.save().then(() => {
                res.code = "200";
                res.send('Order status updated');
            })
        })
    }
    // Restaurants.findOne({
    //     _id: req.body.r_id
    // }).then(restaurant => {
    //     console.log('restaurant    ', restaurant);
    //     console.log('menu', restaurant.menu);
    //     res.code = "200";
    //     res.send(restaurant.menu);
    // })

    //     .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;