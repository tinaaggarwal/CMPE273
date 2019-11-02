const router = require('express').Router();
let Restaurants = require('../models/restaurant');

router.route('/ownerSignup').post((req, res) => {
    console.log("Inside Owner Create Request Handler");
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const owner_email = req.body.email;
    const restaurant_name = req.body.restaurantName;
    const zip_code = req.body.restaurantZipCode;
    const password = req.body.password;

    Restaurants.create({
        first_name,
        last_name,
        owner_email,
        restaurant_name,
        zip_code,
        password
    })
    .then(() => res.json('Owner added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;