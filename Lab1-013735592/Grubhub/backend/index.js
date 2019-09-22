//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
//app.set('view engine', 'ejs');
var mysql = require('mysql');
// var pool = require('./pool');
const multer = require('multer');
var fs = require('fs');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'Tina.1234',
    database: 'grubhub',
    debug: false
})

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());
var clientEmail = "";
var ownerEmail = "";
var sessionResponse = "";

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Route to handle Post Request Call
app.post('/clientLogin', function (req, res) {

    console.log("Inside Client Login Post Request");
    clientEmail = req.body.email;
    var password = req.body.password;
    var sql = "SELECT *  FROM client_signup WHERE client_email = " +
        mysql.escape(clientEmail) + "and password = " + mysql.escape(password);
    console.log(sql)
    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            pool.query(sql, function (err, result) {
                console.log(result)
                if (result.length == 0) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Invalid Credentials");
                } else {
                    //res.cookie('cookie',"username",{maxAge: 900000, httpOnly: false, path : '/'});

                    req.session.user = result;
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successful Login");
                }
            });
        }
    });

});

app.post('/clientSignup', function (req, res) {
    console.log("Inside Client Create Request Handler");
    var sql = "INSERT INTO client_signup VALUES ( " +
        mysql.escape(req.body.firstName) + " , " + mysql.escape(req.body.lastName) + " , " + mysql.escape(req.body.email) + " , " +
        mysql.escape(req.body.password) + " ) ";
    console.log(sql);
    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While Signing up Client");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Client Created Successfully');
        }
    });
});

app.post('/ownerLogin', function (req, res) {

    console.log("Inside Owner Login Post Request");
    ownerEmail = req.body.email;
    var password = req.body.password;
    var sql = "SELECT *  FROM owner_signup WHERE owner_email = " +
        mysql.escape(ownerEmail) + "and password = " + mysql.escape(password);


    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            pool.query(sql, function (err, result) {
                if (result.length == 0) {
                    console.log("hello");
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Invalid Credentials");
                } else {
                    res.cookie('cookie', "username", { maxAge: 900000, httpOnly: false, path: '/' });
                    req.session.user = result;
                    sessionResponse = JSON.parse((JSON.stringify(req.session.user)));
                    console.log("r_id", sessionResponse[0].r_id);
                    console.log("r_id", sessionResponse[0].owner_email);
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successful Login");
                }
            });
        }
    });

});

app.post('/ownerSignup', function (req, res) {
    console.log("Inside Owner Create Request Handler");
    var sql = "INSERT INTO owner_signup (first_name, last_name, owner_email, restaurant_name, restaurant_zip_code, password) VALUES ( " +
        mysql.escape(req.body.firstName) + " , " + mysql.escape(req.body.lastName) + " , " + mysql.escape(req.body.email) + " , " + mysql.escape(req.body.restaurantName) + " , " + mysql.escape(req.body.restaurantZipCode) + " , " + mysql.escape(req.body.password) + " ) ";
    console.log(sql);

    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While Signing up Owner");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Owner Created Successfully');
        }
    });
});

app.get('/userUpdate', function (req, res) {
    console.log(clientEmail)
    var sql = "SELECT * FROM client_signup where client_email = '" + clientEmail + "'";
    console.log(sql)
    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection ");
        } else {
            pool.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    console.log(result);
                    console.log((result[0]).first_name);
                    console.log(JSON.stringify(result));
                    res.end(JSON.stringify(result));

                }
            });
        }
    })

})

app.post('/userUpdateName', function (req, res) {
    console.log("Inside Update name Handler");
    // var sql = "UPDATE client_update SET first_name = '"+req.body.first_name+"', last_name = '"+req.body.last_name+"'  WHERE client_email = '"+clientEmail+"'" ;
    var sql = "UPDATE client_signup SET first_name = '" + req.body.first_name + "', last_name = '" + req.body.last_name + "'  WHERE client_email = '" + clientEmail + "'";
    console.log(sql)
    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While updating name");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Name updated Successfully');
        }
    });
});

app.post('/userUpdateEmail', function (req, res) {
    console.log("Inside Update email Handler");
    var sql = "UPDATE client_update SET client_email = '" + req.body.client_email + "'  WHERE client_email = '" + clientEmail + "' AND " + "'" + req.body.confirmEmail + "'" + " = '" + req.body.client_email + "'";
    var sql1 = "UPDATE client_signup SET client_email = '" + req.body.client_email + "'  WHERE client_email = '" + clientEmail + "' AND " + "'" + req.body.confirmEmail + "'" + " = '" + req.body.client_email + "'";
    console.log(sql)
    console.log(sql1)
    pool.query(sql1)
    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While updating email");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Email updated Successfully');
        }
    });
});

app.post('/userUpdatePassword', function (req, res) {
    console.log("Inside Update Password Handler");
    var sql = "UPDATE client_signup SET password = '" + req.body.newPassword + "'  WHERE password = '" + req.body.password + "' AND " + "'" + req.body.newPassword + "'" + " = '" + req.body.confirmPassword + "'";
    console.log(sql)
    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While updating password");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Password updated Successfully');
        }
    });
});

app.get('/addressUpdate', function (req, res) {
    console.log(clientEmail)
    var sql = "SELECT * FROM client_update where client_email = '" + clientEmail + "'";
    console.log(sql)
    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection ");
        } else {
            pool.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    console.log(result);
                    // console.log((result[0][0]).first_name); 
                    console.log(JSON.stringify(result));
                    res.end(JSON.stringify(result));

                }
            });
        }
    })

})

app.post('/userUpdateAddress', function (req, res) {
    console.log("Inside Update Address Handler");
    var sql = "UPDATE client_update SET street_address = '" + req.body.street_address + "', apt = '" + req.body.apt +
        "', city = '" + req.body.city + "', state = '" + req.body.state + "', zip_code = '" + req.body.zip_code +
        "', phone = '" + req.body.phone + "', cross_street = '" + req.body.cross_street + "', delivery_instructions = '" + req.body.delivery_instructions +
        "', address_name = '" + req.body.address_name + "'  WHERE client_email = '" + clientEmail + "'";
    console.log(sql)
    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While updating address");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Address updated Successfully');
        }
    });
});

app.post('/userAddAddress', function (req, res) {
    console.log("Inside Insert Address Handler");

    var sql = "INSERT INTO client_update VALUES ( " +
        mysql.escape(clientEmail) + " , " + mysql.escape(req.body.street_address) + " , " + mysql.escape(req.body.apt)
        + " , " + mysql.escape(req.body.city) + " , " + mysql.escape(req.body.state) + " , " + mysql.escape(req.body.zip_code)
        + " , " + mysql.escape(req.body.phone) + " , " + mysql.escape(req.body.cross_street) +
        " , " + mysql.escape(req.body.delivery_instructions) + " , " + mysql.escape(req.body.address_name) + " ) ";

    console.log(sql)
    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While updating address");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Address updated Successfully');
        }
    });
});


// Owner

app.get('/ownerUpdate', function (req, res) {

    console.log('Inside owner profile')
    console.log(sessionResponse[0].owner_email);
    var sql = "SELECT * FROM owner_profile where owner_email = '" + sessionResponse[0].owner_email + "'";
    console.log(sql)
    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection ");
        } else {
            pool.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    console.log(result);
                    console.log((result[0]).first_name);
                    console.log(JSON.stringify(result));
                    res.end(JSON.stringify(result));

                }
            });
        }
    })

})

app.post('/ownerUpdateProfile', function (req, res) {
    console.log("Inside Update name Handler");
    // var sql = "UPDATE client_update SET first_name = '"+req.body.first_name+"', last_name = '"+req.body.last_name+"'  WHERE client_email = '"+clientEmail+"'" ;
    var sql = "UPDATE owner_profile SET first_name = '" + req.body.first_name + "', last_name = '" + req.body.last_name 
    + "', owner_email = '" + req.body.owner_email + "', phone = '" + req.body.phone + "', rest_name = '" + req.body.rest_name
    + "', cuisine = '" + req.body.cuisine + "'  WHERE owner_email = '" + sessionResponse[0].owner_email + "'";
    console.log(sql)
    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While updating name");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Name updated Successfully');
        }
    });
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");