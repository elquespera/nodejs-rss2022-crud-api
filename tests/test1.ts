import { API_ROUTE } from '../src/request.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
const should = chai.should();

import runServer from '../src/server.js';

chai.use(chaiHttp);

const server = runServer(true);

const logResponse = (status: number, body: any) => {
  console.log('Server response:', status, body);
}

describe("Test Scenario 1", () => { 

  describe(`Get, add, and modify user records with requests to ${API_ROUTE}`, () => {
    it('GET all users', done => {
      chai.request(server)
          .get(API_ROUTE)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
            logResponse(res.status, res.body);
          });
    });

    let userID: string;
    it('Create a new user with POST', done => {
      chai.request(server)
          .post(API_ROUTE)
          .send({name: 'Jill', age: 22, hobbies: []})
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            res.body.should.have.property('age');
            res.body.should.have.property('hobbies');
            userID = res.body.id;
            done();
            logResponse(res.status, res.body);
          });
    });
    it(`Get a user by ID with GET`, done => {
      chai.request(server)
          .get(API_ROUTE + '/' + userID)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            res.body.should.have.property('age');
            res.body.should.have.property('hobbies');
            done();
            logResponse(res.status, res.body);
          });
    });

    it('Update user with PUT', done => {
      chai.request(server)
          .put(API_ROUTE + '/' + userID)
          .send({name: 'Jill', age: 45, hobbies: ['Skiing', 'Skating']})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            res.body.should.have.property('age');
            res.body.should.have.property('hobbies');
            res.body.id.should.eql(userID);
            done();
            logResponse(res.status, res.body);
          });
    });

    it('Delete user with DELETE', done => {
      chai.request(server)
          .delete(API_ROUTE + '/' + userID)
          .end((err, res) => {
            res.should.have.status(204);
            done();
            logResponse(res.status, res.body);
          });
    });

    it(`Get a user by ID that doesn't exist`, done => {
      chai.request(server)
          .get(API_ROUTE + '/' + userID)
          .end((err, res) => {
            res.should.have.status(404);
            done();
            logResponse(res.status, res.body);
          });
    });
  });

  server.close();
});