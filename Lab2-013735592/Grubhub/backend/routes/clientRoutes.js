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
            runValidators: true ,
            upsert: true,
            useFindAndModify: false
        }).then((user)=>{
            console.log('user name updated')
            res.code = "200";
            res.send({user});
    },(err) => {
        res.code = "400";
        res.send("Bad Request");
    })
})

router.route('/userUpdateEmail').post((req, res) => {
    console.log("Inside Update email Handler");
    const { client_email} = req.body;

    Client.findOneAndUpdate(
        {
            _id: client_id
        },
        {
            client_email
        },
        {
            new: true,
            runValidators: true ,
            upsert: true,
            useFindAndModify: false
        }).then((user)=>{
            console.log('user email updated')
            res.code = "200";
            res.send({user});
    },(err) => {
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
            runValidators: true ,
            upsert: true,
            useFindAndModify: false
        }).then((user)=>{
            console.log('user password updated')
            res.code = "200";
            res.send({user});
    },(err) => {
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
            runValidators: true ,
            upsert: true,
            useFindAndModify: false
        }).then((user)=>{
            console.log('user address added')
            res.code = "200";
            res.send({user});
    },(err) => {
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
            runValidators: true ,
            upsert: true,
            useFindAndModify: false
        }).then((user)=>{
            console.log('user address updated')
            res.code = "200";
            res.send({user});
    },(err) => {
        res.code = "400";
        res.send("Bad Request");
    })
})

module.exports = router;