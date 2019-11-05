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

    kafka.make_request('owner_sections', owner_id, function (err, results) {
        console.log('in result of owner sections');

        if (err) {
            console.log('Unable to get restaurant details', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in get connections');
        }
        else {
            console.log('Get list of sections in menu for owner succesuful.', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }
    });
});

router.route('/ownerAddSection').post((req, res) => {
    console.log("Inside Insert Section Handler");
    const { section_name, section_description } = req.body;

    let msg = {
        section_name: section_name,
        section_description: section_description,
        owner_id: owner_id
    }
    kafka.make_request('owner_add_section', msg, function (err, results) {
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
            console.log('Owner restaurant section added successfully', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }
    });
})

router.route('/ownerUpdateSection').post((req, res) => {
    console.log("Inside update Section Handler");
    console.log('req.body....', req.body)
    const { section_name, section_description, section_id } = req.body;

    let msg = {
        section_name: section_name,
        section_description: section_description,
        section_id: section_id,
        owner_id: owner_id
    }
    kafka.make_request('owner_update_section', msg, function (err, results) {
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
            console.log('Owner restaurant section updated successfully', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }
    });
})

router.route('/ownerAddItem').post((req, res) => {
    console.log("Inside Insert Item Handler");
    const { section_id, item_name, item_description, item_image, item_price } = req.body;

    let msg = {
        item_name: item_name,
        item_description: item_description,
        item_image: item_image,
        item_price: item_price,
        section_id: section_id,
        owner_id: owner_id
    }
    kafka.make_request('owner_add_item', msg, function (err, results) {
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
            console.log('Owner restaurant item added to menu successfully', results);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(results));
        }
    });
})

router.route('/ownerItemsList').get((req, res) => {
    console.log('Inside Owner items list Request Handler')

    kafka.make_request('owner_items_list', owner_id, function (err, results) {
        console.log('in result of owner items list');

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
