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
    .send({ "email": "inchins@inchins.com", "password" : "inchins"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})


it("Should search and filter database and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/searchItem')
    .send({ "searchItem": "Pizza", "filterCuisine" : "Indian"})
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

it("Should find list of distinct cuisines and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .get('/distinctCuisines')
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})



