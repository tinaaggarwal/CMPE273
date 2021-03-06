//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var { urlencoded, json } = require('body-parser');
var { resolve } = require('path');
var { uploader, cloudinaryConfig } = require('./config/cloudinaryConfig');
var { multerUploads, dataUri } = require('./Middleware/multer');
var cookieParser = require('cookie-parser');
var cors = require('cors');
//app.set('view engine', 'ejs');
var mysql = require('mysql');
// var pool = require('./pool');
const multer = require('multer');
var fs = require('fs');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

require('dotenv').config();

var mongoose = require('mongoose');
var clientRouter = require('./routes/clientRoutes');
var ownerRouter = require('./routes/ownerRoutes');

require('dotenv').config();

// var pool = mysql.createPool({
//     connectionLimit: 100,
//     host: 'localhost',
//     user: 'root',
//     password: 'Tina.1234',
//     database: 'grubhub',
//     debug: false
// })

const uri = 'mongodb+srv://root:root.1234@grubhub-u2eiw.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
})

// const uri = process.env.ATLAS_URI;

// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});

// const connection = mongoose.connection;

// connection.once('open', () => {
//     console.log('MongoDB connection established successfully');
// })
// var pool = mysql.createPool({
//     connectionLimit: 100,
//     port: '3306',
//     host: 'grubhub.cv9vraaep5ay.us-west-2.rds.amazonaws.com',
//     user: 'admin',
//     password: 'Tina.1234',
//     database: 'grubhub',
//     debug: false
// })

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://52.35.122.135:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    store: new MongoStore({ mongooseConnection: connection }),
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));


app.use(bodyParser.json());


//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://52.35.122.135:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/', clientRouter);
app.use('/', ownerRouter);

app.use('*', cloudinaryConfig);
app.get('/*', (req, res) => res.sendFile(resolve(__dirname, '../public/index.html')));
app.post('/upload', multerUploads, (req, res) => {
    if (req.file) {
        const file = dataUri(req).content;
        return uploader.upload(file).then((result) => {
            const image = result.url;
            return res.status(200).json({
                messge: 'Your image has been uploded successfully to cloudinary',
                data: {
                    image
                }
            })
        }).catch((err) => res.status(400).json({
            messge: 'someting went wrong while processing your request',
            data: {
                err
            }
        }))
    }
});

// Owner

app.post('/ownerDeleteSection', function (req, res) {
    console.log("Inside Delete Section Handler");
    console.log(req.body)

    var sql = "DELETE FROM menu_table WHERE section_id = " + mysql.escape(req.body.deleteId);
    console.log(sql)

    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While deleting section");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('section deleted Successfully');
        }
    });
});


app.post('/ownerDeleteItem', function (req, res) {
    console.log("Inside Delete Item Handler");
    console.log(req.body)

    var sql = "DELETE FROM item_table WHERE item_id = " + mysql.escape(req.body.deleteId);
    console.log(sql)

    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While deleting section");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('section deleted Successfully');
        }
    });
});

app.post('/searchItem', function (req, res) {
    console.log("Inside get all menu sections for client Handler");

    console.log('cuisine....', req.body.filterCuisine)

    if (!req.body.searchItem && req.body.filterCuisine) {
        var sql = "SELECT owner_profile.rest_name, owner_profile.rest_image, owner_profile.cuisine, owner_profile.rest_zip_code, owner_profile.r_id " +
            "from owner_profile where cuisine = " + mysql.escape(req.body.filterCuisine);
    } else if (!req.body.filterCuisine && req.body.searchItem) {
        var sql = "SELECT owner_profile.rest_name, owner_profile.rest_image, owner_profile.cuisine, owner_profile.rest_zip_code, owner_profile.r_id "
            + "from owner_profile "
            + "inner join menu_table on owner_profile.r_id = menu_table.r_id "
            + "inner join item_table on menu_table.section_id = item_table.section_id "
            + "where item_table.item_name like " + mysql.escape('%' + req.body.searchItem + '%');
    } else {
        var sql = "SELECT owner_profile.rest_name, owner_profile.rest_image, owner_profile.cuisine, owner_profile.rest_zip_code, owner_profile.r_id "
            + "from owner_profile "
            + "inner join menu_table on owner_profile.r_id = menu_table.r_id "
            + "inner join item_table on menu_table.section_id = item_table.section_id "
            + "where item_table.item_name like " + mysql.escape('%' + req.body.searchItem + '%') + "and cuisine = " + mysql.escape(req.body.filterCuisine);
    }

    console.log(sql)

    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error While deleting section");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            console.log(result)
            res.end(JSON.stringify(result));
        }
    });
});

app.get('/distinctCuisines', function (req, res) {
    console.log("Inside clients homepage get list of distinct cuisines for dropdown filter Request Handler");

    var sql = "SELECT DISTINCT(cuisine) from owner_profile";
    pool.getConnection(function (err, pool) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
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
                    console.log(result)
                    res.end(JSON.stringify(result));

                }
            });
        }
    })
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");