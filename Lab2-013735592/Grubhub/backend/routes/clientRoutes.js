const router = require('express').Router();
let Client = require('../models/client');

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

    const newClient = new Client({
        first_name,
        last_name,
        client_email,
        password
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
        console.log('owner', client);
        res.code = "200";
        res.send(client);
    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;