import { API_ROUTE } from '../src/url.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
const should = chai.should();

import runServer from '../src/server.js';
import User  from '../src/user.js';

chai.use(chaiHttp);

const server = runServer(true);

describe("Test Scenario 1", function () { 

  describe(`Get all user records with GET request to ${API_ROUTE}`, function () {
    it('GET all users', done => {
      chai.request(server)
          .get(API_ROUTE)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done(err);
          });
    });
    it('Create a new user with POST', done => {
      chai.request(server)
          .post(API_ROUTE)
          .send({name: 'Name', age: 22, hobbies: []})
          .end((err, res) => {
            console.log(res.body);
            res.should.have.status(200);
            // res.body.should.be.a('array');
            // res.body.length.should.be.eql(0);
            done(err);
          });
    });
  });


  server.close();
});