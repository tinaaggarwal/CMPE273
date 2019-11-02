const router = require('express').Router();
let Restaurants = require('../models/restaurant');
let owner_id = '';

router.route('/ownerSignup').post((req, res) => {
    console.log("Inside Owner Create Request Handler");
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const owner_email = req.body.email;
    const restaurant_name = req.body.restaurantName;
    const zip_code = req.body.restaurantZipCode;
    const password = req.body.password;

    const newOwner = new Restaurants({
        first_name,
        last_name,
        owner_email,
        restaurant_name,
        zip_code,
        password
    })

    newOwner.save()
    .then(() => res.json('Owner added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/ownerLogin').post((req, res) => {
    console.log("Inside Owner Login Post Request");

    owner_email = req.body.email;
    const password = req.body.password;
    Restaurants.findOne({
        owner_email,
        password
    }).then(user => {
        if (!user) {
            return new Error("Owner Login failed!");
        }
        console.log('user', user);
        // res.cookie('cookie', 'owner', { maxAge: 900000, httpOnly: false, path: '/' });
        console.log('req.session', req.session);
        req.session.user = user;
        owner_id = req.session.user._id;
        console.log(req.session.user);
        console.log(req.session.user._id);
        res.end("Successful Login");
    }).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/ownerUpdate').get((req, res) => {
    console.log('Inside owner profile')
    console.log(owner_id);
    Restaurants.findOne({
        _id: owner_id
    })
    .then(owner => {
        console.log('owner', owner);
        res.code = "200";
        res.send(owner);
    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;