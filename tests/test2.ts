import { API_ROUTE } from '../src/request.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
const should = chai.should();
chai.use(chaiHttp);

import { server, logResponse } from './test-utils.js';

describe("Test Scenario 2. Invalid input data", () => { 

  describe(`Try to PUT a new user with invalid input data`, () => {
    
    it('User name is missing', done => {
      chai.request(server)
          .post(API_ROUTE)
          .send({age: 22, hobbies: []})
          .end((err, res) => {
            res.should.have.status(400);
            done();
            logResponse(res.status, res.body);
          });
    });

    it('User age is missing', done => {
        chai.request(server)
            .post(API_ROUTE)
            .send({name: 'Jill', hobbies: []})
            .end((err, res) => {
              res.should.have.status(400);
              done();
              logResponse(res.status, res.body);
            });
    });

    it('User age cannot be converted to an integer', done => {
        chai.request(server)
            .post(API_ROUTE)
            .send({name: 'Jill', age: "s22", hobbies: []})
            .end((err, res) => {
              res.should.have.status(400);
              done();
              logResponse(res.status, res.body);
            });
    });    

    it('Hobbies are missing', done => {
        chai.request(server)
            .post(API_ROUTE)
            .send({name: 'Jill', age: 22})
            .end((err, res) => {
              res.should.have.status(400);
              done();
              logResponse(res.status, res.body);
            });
    });

    it('Hobbies are not an array', done => {
        chai.request(server)
            .post(API_ROUTE)
            .send({name: 'Jill', age: 22, hobbies: 'Skiing'})
            .end((err, res) => {
              res.should.have.status(400);
              done();
              logResponse(res.status, res.body);
            });
    });

  });
  
});