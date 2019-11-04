const router = require('express').Router();
let Client = require('../models/client');
let Restaurants = require('../models/restaurant');

let client_id = '';

//Find - Mongoose method that gets the list of all users from MongoDB Atlas
// router.route('/').get((req, res) => {
//     Client.find()
//     .then(client => res.json(client))
//     .catch(err => res.status(400).json('Error: '+err));
// });

router.route('/clientSignup').post((req, res) => {
    console.log("Inside Client Create Request Handler");
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const client_email = req.body.email;
    const password = req.body.password;
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

    newClient.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/clientLogin').post((req, res) => {
    console.log("Inside Client Login Post Request");

    client_email = req.body.email;
    const password = req.body.password;
    Client.findOne({
        client_email,
        password
    }).then(user => {
        if (!user) {
            return new Error("User Login failed!");
        }
        console.log('user', user);
        // res.cookie('cookie', 'client', { maxAge: 900000, httpOnly: false, path: '/' });
        console.log('req.session', req.session);
        req.session.user = user;
        client_id = req.session.user._id;
        console.log(req.session.user);
        console.log(req.session.user._id);
        res.end("Successful Login");
    }).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/userUpdate').get((req, res) => {
    console.log('Inside client profile')
    console.log(client_id);
    Client.findOne({
        _id: client_id
    })
        .then(client => {
            console.log('client', client);
            res.code = "200";
            res.send(client);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/userUpdateName').post((req, res) => {
    console.log("Inside Update name Handler");
    const { first_name, last_name } = req.body;

    Client.findOneAndUpdate(
        {
            _id: client_id
        },
        {
            first_name: first_name,
            last_name: last_name
        },
        {
            new: true,
            runValidators: true,
            upsert: true,
            useFindAndModify: false
        }).then((user) => {
            console.log('user name updated')
            res.code = "200";
            res.send({ user });
        }, (err) => {
            res.code = "400";
            res.send("Bad Request");
        })
})

router.route('/userUpdateEmail').post((req, res) => {
    console.log("Inside Update email Handler");
    const { client_email } = req.body;

    Client.findOneAndUpdate(
        {
            _id: client_id
        },
        {
            client_email
        },
        {
            new: true,
            runValidators: true,
            upsert: true,
            useFindAndModify: false
        }).then((user) => {
            console.log('user email updated')
            res.code = "200";
            res.send({ user });
        }, (err) => {
            res.code = "400";
            res.send("Bad Request");
        })
})

router.route('/userUpdatePassword').post((req, res) => {
    console.log("Inside Update password Handler");
    const { newPassword, confirmPassword } = req.body;
    Client.findOneAndUpdate(
        {
            _id: client_id
        },
        {
            password: newPassword
        },
        {
            new: true,
            runValidators: true,
            upsert: true,
            useFindAndModify: false
        }).then((user) => {
            console.log('user password updated')
            res.code = "200";
            res.send({ user });
        }, (err) => {
            res.code = "400";
            res.send("Bad Request");
        })
})

router.route('/addressUpdate').get((req, res) => {
    console.log('Inside client address profile part')
    console.log(client_id);
    Client.findOne({
        _id: client_id
    })
        .then(client => {
            console.log('client', client);
            res.code = "200";
            res.send(client);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/userAddAddress').post((req, res) => {
    console.log("Inside Add user address Handler");
    const { street_address, apt, city, state, zip_code, phone, cross_street, delivery_instructions, address_name } = req.body;
    Client.findOneAndUpdate(
        {
            _id: client_id
        },
        {
            street_address,
            apt,
            city,
            state,
            zip_code,
            phone,
            cross_street,
            delivery_instructions,
            address_name
        },
        {
            new: true,
            runValidators: true,
            upsert: true,
            useFindAndModify: false
        }).then((user) => {
            console.log('user address added')
            res.code = "200";
            res.send({ user });
        }, (err) => {
            res.code = "400";
            res.send("Bad Request");
        })
})

router.route('/userUpdateAddress').post((req, res) => {
    console.log("Inside Add user address Handler");
    const { street_address, apt, city, state, zip_code, phone, cross_street, delivery_instructions, address_name } = req.body;
    Client.findOneAndUpdate(
        {
            _id: client_id
        },
        {
            street_address,
            apt,
            city,
            state,
            zip_code,
            phone,
            cross_street,
            delivery_instructions,
            address_name
        },
        {
            new: true,
            runValidators: true,
            upsert: true,
            useFindAndModify: false
        }).then((user) => {
            console.log('user address updated')
            res.code = "200";
            res.send({ user });
        }, (err) => {
            res.code = "400";
            res.send("Bad Request");
        })
})

router.route('/userUpdateProfileImage').post((req, res) => {
    console.log("Inside Update profile image Handler");
    const { profile_image } = req.body;
    Client.findOneAndUpdate(
        {
            _id: client_id
        },
        {
            profile_image
        },
        {
            new: true,
            runValidators: true,
            upsert: true,
            useFindAndModify: false
        }).then((user) => {
            console.log('Profile image added Successfully')
            res.code = "200";
            res.send({ user });
        }, (err) => {
            res.code = "400";
            res.send("Bad Request");
        })
})

router.route('/restaurantList').get((req, res) => {
    console.log('Inside get restaurant list Request Handler')
    Restaurants.find({
    }).then(restaurants => {
        console.log('restaurants', restaurants);
        res.code = "200";
        res.send(restaurants);
    })

        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/menuItems').post((req, res) => {
    console.log('r_id  :   ', req.body.r_id)
    console.log('Inside get menu items list Request Handler')
    Restaurants.findOne({
        _id: req.body.r_id
    }).then(restaurant => {
        console.log('restaurant    ', restaurant);
        console.log('menu', restaurant.menu);
        res.code = "200";
        res.send(restaurant.menu);
    })

        .catch(err => res.status(400).json('Error: ' + err));
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
                    // console.log('    ', restaurant);
                    // console.log('menu', restaurant.menu);
                    res.code = "200";
                    res.send('Order placed');
                })
            })

        })

    }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;