const router = require('express').Router();
var _ = require('lodash');
let Restaurants = require('../models/restaurant');
let owner_id = '';
var kafka = require('../kafka/client');

router.route('/ownerSignup').post((req, res) => {

    kafka.make_request('owner_signup', req.body, function (err, results) {
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

router.route('/ownerLogin').post((req, res) => {

    kafka.make_request('owner_login', req.body, function (err, results) {
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
            owner_id = req.session.user._id;
            res.status(200).send(results.msg);
        }
    });
});

router.route('/ownerUpdate').get((req, res) => {
    console.log('Inside owner update fetch client profile')
    console.log(owner_id);

    kafka.make_request('owner_update', owner_id, function (err, results) {
        console.log('in result of owner update');

        if(err){
            console.log('Unable to get owner details', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in get connections');
        }
        else{
            console.log('Get owner data sucesssful.', results);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(results));
        }

    });
})

router.route('/ownerUpdateProfile').post((req, res) => {
    console.log("Inside Update Restaurant details Handler");
    const { first_name, last_name, owner_email, phone, restaurant_name, cuisine } = req.body;

    let msg = {
        first_name: first_name,
        last_name: last_name,
        owner_email: owner_email,
        phone: phone,
        restaurant_name: restaurant_name,
        cuisine: cuisine,
        owner_id: owner_id
    }

    kafka.make_request('owner_update_profile', msg, function (err, results) {
        console.log('in result');
        console.log(results);

        if (err) {
            console.log('Unable to get owner details, The restaurant is not valid', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('The restaurant is not valid');
        }
        else {
            console.log('Owner profile updated successfully', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }
    });
})

router.route('/ownerUpdateProfileImage').post((req, res) => {
    console.log("Inside Update profile image for owner Handler");
    const { profile_image } = req.body;

    let msg = {
        profile_image: profile_image,
        owner_id: owner_id
    }
    kafka.make_request('owner_update_profile_image', msg, function (err, results) {
        console.log('in result');
        console.log(results);

        if (err) {
            console.log('Unable to get owner details, The restaurant is not valid', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('The restaurant is not valid');
        }
        else {
            console.log('Owner profile_image added successfully', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }
    });
})

router.route('/ownerUpdateRestImage').post((req, res) => {
    console.log("Inside Update restaurant image for owner Handler");
    const { rest_image } = req.body;
    
    let msg = {
        rest_image: rest_image,
        owner_id: owner_id
    }
    kafka.make_request('owner_update_rest_image', msg, function (err, results) {
        console.log('in result');
        console.log(results);

        if (err) {
            console.log('Unable to get owner details, The restaurant is not valid', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('The restaurant is not valid');
        }
        else {
            console.log('Owner rest_image added successfully', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }
    });
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

    Restaurants.updateOne({ 'menu._id': section_id }, {
        '$set': {
            'menu.$.section_name': section_name,
            'menu.$.section_description': section_description
        }
    }).then(section => {
        console.log('section', section);
        res.code = "200";
        res.send(section);
    })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/ownerAddItem').post((req, res) => {
    console.log("Inside Insert Item Handler");
    const { section_id, item_name, item_description, item_image, item_price } = req.body;
    Restaurants.findOne({
        _id: owner_id,
    }).then(restaurant => {
        const section = _.find(restaurant.menu, (section) => section.id === section_id)
        section.item.push({
            item_name: item_name,
            item_description: item_description,
            item_image: item_image,
            item_price: item_price
        })
        restaurant.save().then(() => {
            console.log('Item added Successfully')
            res.code = "200";
            res.send({ user });
        }, (err) => {
            res.code = "400";
            res.send("Bad Request");
        })

    })
})

router.route('/ownerItemsList').get((req, res) => {
    console.log('Inside Owner items list Request Handler')

    kafka.make_request('owner_items_list', owner_id, function (err, results) {
        console.log('in result of user update');

        if (err) {
            console.log('Unable to get restaurant details', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in get connections');
        }
        else {
            console.log('Get list of items in menu for owner succesuful.', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }

    });

});

router.route('/upcomingOrdersForOwner').get((req, res) => {
    console.log('Inside get upcoming orders list for owner Request Handler')

    kafka.make_request('upcoming_orders_for_owner', owner_id, function (err, results) {
        console.log('in result of upcomingOrdersForOwner');

        if (err) {
            console.log('Unable to get restaurant details', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in get connections');
        }
        else {
            console.log('Get list of upcoming orders for owner succesuful.', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }

    });
});

router.route('/pastOrdersForOwner').get((req, res) => {
    console.log('Inside get past orders list for owner Request Handler')

    kafka.make_request('past_orders_for_owner', owner_id, function (err, results) {
        console.log('in result of pastOrdersForOwner');

        if (err) {
            console.log('Unable to get restaurant details', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in get connections');
        }
        else {
            console.log('Get list of past orders for owner succesuful.', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }

    });

});

module.exports = router;
