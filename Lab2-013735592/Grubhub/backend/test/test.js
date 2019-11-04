var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check client login credentials and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/clientLogin')
    .send({ "email": "tina@aggarwal.com", "password" : "tina"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})


it("Should check owner login credentials and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/ownerLogin')
    .send({ "email": "chipotle@chipotle.com", "password" : "chipotle"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})


it("Should find list of restaurants and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .get('/restaurantList')
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})


it("Should find list of items in a restaurant and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/menuItems')
    .send({ "r_id": "5dbe52a119a66352a3f88434" })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})


it("Should find list of upcoming orders for owner and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .get('/upcomingOrdersForOwner')
    .send({ "_id": "5dbe52a119a66352a3f88434"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})



