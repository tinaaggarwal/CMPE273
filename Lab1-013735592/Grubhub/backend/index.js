//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
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
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());



//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
 
  //Route to handle Post Request Call
app.post('/clientLogin',function(req,res){
    
    console.log("Inside Client Login Post Request");
        var email = req.body.email;
        var password = req.body.password;
        var sql = "SELECT *  FROM client_signup WHERE client_email = " + 
                mysql.escape(email)  + "and password = " + mysql.escape(password);

    pool.getConnection(function(err,pool){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            pool.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }else{
                    //res.cookie('cookie',"username",{maxAge: 900000, httpOnly: false, path : '/'});
                    req.session.user = result;
                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Successful Login");
                }
            });
        }
    });
    
});

app.post('/clientSignup',function(req,res){
    console.log("Inside Client Create Request Handler");
    var sql = "INSERT INTO client_signup VALUES ( " + 
    mysql.escape(req.body.firstName) + " , " + mysql.escape(req.body.lastName) + " , " + mysql.escape(req.body.email) + " , "+
    mysql.escape(req.body.password) + " ) ";
    console.log(sql);
    //var sql1 = "INSERT INTO prop_desc (name) VALUES ( " + mysql.escape(req.body.Name) + " ) ";
    //pool.query(sql1);
    pool.query(sql,function(err,result){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error While Signing up Client");
        }else{
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end('Owner Created Successfully');
        }
    });
    
});

app.post('/ownerLogin',function(req,res){
    
    console.log("Inside Owner Login Post Request");
        var email = req.body.email;
        var password = req.body.password;
        var sql = "SELECT *  FROM owner_signup WHERE owner_email = " + 
                mysql.escape(email)  + "and password = " + mysql.escape(password);

    pool.getConnection(function(err,pool){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            pool.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }else{
                    //res.cookie('cookie',"username",{maxAge: 900000, httpOnly: false, path : '/'});
                    req.session.user = result;
                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Successful Login");
                }
            });
        }
    });
    
});

app.post('/ownerSignup',function(req,res){
    console.log("Inside Owner Create Request Handler");
    var sql = "INSERT INTO owner_signup VALUES ( " + 
    mysql.escape(req.body.firstName) + " , " + mysql.escape(req.body.lastName) + " , " + mysql.escape(req.body.email) + " , " + mysql.escape(req.body.restaurantName) + " , " + mysql.escape(req.body.restaurantZipCode) + " , " + mysql.escape(req.body.password) + " ) ";
    console.log(sql);
    //var sql1 = "INSERT INTO prop_desc (name) VALUES ( " + mysql.escape(req.body.Name) + " ) ";
    //pool.query(sql1);
    pool.query(sql,function(err,result){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error While Signing up Owner");
        }else{
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end('Owner Created Successfully');
        }
    });
    
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");