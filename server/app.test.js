const request = require('supertest')
const assert = require('assert')
let chai = require('chai')
let chaiHttp = require('chai-http')
const app = require('./app').app

let should = chai.should();

chai.use(chaiHttp);

describe('API test', function () {
    it('should return all users', function (done) {
        chai.request(app)
            .get('/api/users')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    });
});

describe('App tests', function () {
    it('should return contacts page', function (done) {

        request(app)
            .get('/contacts')
            .expect('Contacts page')
            .end(done)
    });

    it('should return NotFound with status 404', function (done) {
        request(app)
            .get('/error')
            .expect(404)
            .expect('NotFound')
            .end(done)
    });

    it('should eturn user with name Tom and age 22', function (done) {
        const responseBody = {name:"Tom", age: 22};
        request(app)
            .get("/user")
            .expect(function (response) {
                assert.deepStrictEqual(response.body, responseBody)
            })
            .end(done)
    });
});

