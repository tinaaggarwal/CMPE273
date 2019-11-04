//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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

const connection  = mongoose.connection;
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
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    store: new MongoStore({ mongooseConnection: connection }),
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
var orderId;
var id;
var nextOrderId;
var imageId = 'images';

var storagePropFiles = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log("req.session.user is", JSON.stringify(req.params));
        callback(null, createDirectory(imageId));
    },
    filename: function (req, file, callback) {
        console.log("req", req.body);
        callback(null, file.originalname);
    }
});

// var rootDirectory = "public/images/";
var rootDirectory = "/Users/tinaaggarwal/Documents/GitHub/CMPE273/Lab2-013735592/Grubhub/frontend/public/images/";

var uploadPropFiles = multer({
    storage: storagePropFiles
});

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/', clientRouter);
app.use('/', ownerRouter);

app.post('/upload', uploadPropFiles.single('image'), (req, res) => {
    console.log(req.file.filename)

    if (req.file)
        res.json({
            imageUrl: `/images/${imageId}/${req.file.filename}`
        });
    else
        res.status("409").json("No Files to Upload.")
});


function createDirectory(imageId) {
    if (!fs.existsSync(rootDirectory)) {
        fs.mkdirSync(rootDirectory);
    }
    let directory = rootDirectory + imageId;
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
    return directory;
}


// Owner

// app.post('/ownerDeleteSection', function (req, res) {
//     console.log("Inside Delete Section Handler");
//     console.log(req.body)

//     var sql = "DELETE FROM menu_table WHERE section_id = " + mysql.escape(req.body.deleteId);
//     console.log(sql)

//     pool.query(sql, function (err, result) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Error While deleting section");
//         } else {
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end('section deleted Successfully');
//         }
//     });
// });


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

// Client side to view restaurants and order items

// app.get('/restaurantList', function (req, res) {
//     console.log("Inside clients homepage get restaurants list Request Handler");

//     var sql = "SELECT rest_name, rest_image, cuisine, rest_zip_code, r_id from owner_profile";
//     pool.getConnection(function (err, pool) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             pool.query(sql, function (err, result) {
//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Could Not Get Connection Object");
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'application/json'
//                     })
//                     console.log(result)
//                     res.end(JSON.stringify(result));
//                 }
//             });
//         }
//     })
// });

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

// app.get('/nextOrderId', function (req, res) {
//     console.log("Inside clients homepage get id for next order Request Handler");

//     var sql = "SELECT MAX(order_id) FROM order_details_table";
//     console.log(sql);

//     pool.getConnection(function (err, pool) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             pool.query(sql, function (err, result) {
//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Could Not Get Connection Object");
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'application/json'
//                     })

//                     orderId = JSON.stringify(result);
//                     console.log(orderId)
//                     orderId = JSON.parse(orderId);
//                     id = Object.values(orderId[0]);
//                     nextOrderId = id[0];
//                     nextOrderId = nextOrderId + 1
//                     // res.end(JSON.stringify(result));
//                     res.send(nextOrderId)

//                 }
//             });
//         }
//     })

// });

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

// NOT CHANGED YET
// app.post('/menuSections', function (req, res) {
//     console.log("Inside get all menu sections for client Handler");

//     console.log(req.body)
//     var sql = "SELECT section_name, section_description, section_id from menu_table WHERE r_id = " + mysql.escape(req.body.r_id);
//     console.log(sql)

//     pool.query(sql, function (err, result) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Error While deleting section");
//         } else {
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             })
//             console.log(result)
//             res.end(JSON.stringify(result));
//         }
//     });
// });

// app.post('/menuItems', function (req, res) {
//     console.log("Inside get all menu items for client Handler");
//     console.log(req.body)
//     var sql = "SELECT item_table.section_id, item_table.item_id, item_table.item_name, item_table.item_image, item_table.item_description, item_table.item_price from item_table, menu_table WHERE item_table.section_id = menu_table.section_id AND menu_table.r_id = " + mysql.escape(req.body.r_id);

//     console.log(sql)

//     pool.query(sql, function (err, result) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Error While deleting section");
//         } else {
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             })
//             console.log(result)
//             res.end(JSON.stringify(result));
//         }
//     });

// });






app.get('/upcomingOrdersForClient', function (req, res) {
    console.log("Inside get client's upcoming orders Request Handler");

    var sql = "SELECT order_id, client_email, client_address, order_bill, order_table.r_id, rest_name, status from order_table, owner_profile where client_email = " + mysql.escape(sessionResponse[0].client_email) + " and status not in ('Delivered', 'Cancelled') and order_table.r_id = owner_profile.r_id "
    console.log(sql);
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

                    res.end(JSON.stringify(result));

                }
            });
        }
    })

});

app.get('/pastOrdersForClient', function (req, res) {
    console.log("Inside get client's upcoming orders Request Handler");

    var sql = "SELECT order_id, client_email, client_address, order_bill, order_table.r_id, rest_name, status from order_table, owner_profile where client_email = " + mysql.escape(sessionResponse[0].client_email) + " and status in ('Delivered', 'Cancelled') and order_table.r_id = owner_profile.r_id order by order_id desc"
    console.log(sql);
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

                    res.end(JSON.stringify(result));

                }
            });
        }
    })

});

app.get('/upcomingOrdersForOwner', function (req, res) {
    console.log("Inside get owner's upcoming orders Request Handler");

    var sql = "SELECT * from order_table where r_id = " + sessionResponse[0].r_id + " and status  not in ('Delivered', 'Cancelled')";
    console.log(sql);
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

                    res.end(JSON.stringify(result));

                }
            });
        }
    })

});

app.get('/pastOrdersForOwner', function (req, res) {
    console.log("Inside get owner's past orders Request Handler");

    var sql = "SELECT * from order_table where r_id = " + sessionResponse[0].r_id + " and status in ('Delivered', 'Cancelled') order by order_id desc";
    console.log(sql);
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

                    res.end(JSON.stringify(result));

                }
            });
        }
    })

});

app.post('/itemsInOrders', function (req, res) {
    console.log("Inside get orders with list of items Request Handler");
    console.log('array of orderids..........', req.body.order_ids)

    if (req.body.order_ids.length === 0) {
        console.log('empty order ids array')
        res.writeHead(204, {
            'Content-Type': 'text/plain'
        })
        res.end('No upcoming orders')
    } else {
        var sql = "SELECT order_details_table.order_id, order_details_table.item_id, item_table.item_image, order_details_table.item_name, order_details_table.item_quantity, order_details_table.item_total_price from order_details_table, item_table WHERE order_id in (" + req.body.order_ids + ") and order_details_table.item_id = item_table.item_id";

        console.log(sql)

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
                res.end(JSON.stringify(result));
            }
        });
    }
});

app.post('/updateOrderStatus', function (req, res) {
    console.log("Inside update order status Request Handler");
    console.log('status....', req.body.status)
    console.log('order id to update ....', req.body.orderIdToUpdate)

    var sql = "UPDATE order_table SET status = " + mysql.escape(req.body.status) + " WHERE order_id = " + req.body.orderIdToUpdate;

    console.log(sql)

    pool.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Order status updated Successfully');
        }
    });
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");