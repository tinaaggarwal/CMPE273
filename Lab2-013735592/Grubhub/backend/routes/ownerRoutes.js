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

    newOwner.save()
        .then(() => res.json('Owner added!'))
        .catch(err => res.status(400).json('Error: ' + err));
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
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/ownerUpdateProfile').post((req, res) => {
    console.log("Inside Update Restaurant details Handler");
    const { first_name, last_name, owner_email, phone, restaurant_name, cuisine } = req.body;

    Restaurants.findOneAndUpdate(
        {
            _id: owner_id
        },
        {
            first_name: first_name,
            last_name: last_name,
            owner_email,
            phone,
            restaurant_name,
            cuisine
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

router.route('/ownerUpdateProfileImage').post((req, res) => {
    console.log("Inside Update profile image for owner Handler");
    const { profile_image } = req.body;
    Restaurants.findOneAndUpdate(
        {
            _id: owner_id
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

router.route('/ownerUpdateRestImage').post((req, res) => {
    console.log("Inside Update restaurant image for owner Handler");
    const { rest_image } = req.body;
    Restaurants.findOneAndUpdate(
        {
            _id: owner_id
        },
        {
            rest_image
        },
        {
            new: true,
            runValidators: true,
            upsert: true,
            useFindAndModify: false
        }).then((user) => {
            console.log('Restaurant image added Successfully')
            res.code = "200";
            res.send({ user });
        }, (err) => {
            res.code = "400";
            res.send("Bad Request");
        })
})

router.route('/ownerSections').get((req, res) => {
    console.log('Inside Owner Sections get Request Handler')
    Restaurants.findOne({
        _id: owner_id
    },
        'menu'
    )
        .then(owner => {
            console.log('owner', owner);
            res.code = "200";
            res.send(owner);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/ownerAddSection').post((req, res) => {
    console.log("Inside Insert Section Handler");
    const { section_name, section_description } = req.body;
    Restaurants.findOneAndUpdate(
        {
            _id: owner_id
        },
        {
            $push: {
                menu: {
                    section_name,
                    section_description
                }
            }
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
            useFindAndModify: false
        }).then((user) => {
            console.log('Section added Successfully')
            res.code = "200";
            res.send({ user });
        }, (err) => {
            res.code = "400";
            res.send("Bad Request");
        })
})

router.route('/ownerUpdateSection').post((req, res) => {
    console.log("Inside update Section Handler");
    console.log('req.body....', req.body)
    const { section_name, section_description, section_id } = req.body;

    Restaurants.updateOne({'menu._id': section_id}, {'$set': {
        'menu.$.section_name': section_name,
        'menu.$.section_description': section_description
    }}).then(section => {
        console.log('section', section);
        res.code = "200";
        res.send(section);
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
