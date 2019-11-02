const router = require('express').Router();
let Client = require('../models/client');

//Find - Mongoose method that gets the list of all users from MongoDB Atlas
router.route('/').get((req, res) => {
    Client.find()
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/clientSignup').post((req, res) => {
    console.log("Inside Client Create Request Handler");
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const client_email = req.body.email;
    const password = req.body.password;

    const newClient = new Client({
        first_name,
        last_name,
        client_email,
        password
    })

    // const newUser = new Client({first_name});
    //Save - save to the MongoDB Atlas Database
    // Client.save({
    //     first_name,
    //     last_name,
    //     client_email,
    //     password
    // })
    newClient.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;