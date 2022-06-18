import { API_ROUTE } from '../src/request.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
const should = chai.should();
chai.use(chaiHttp);

import { server } from './test-utils.js';

describe("Test Scenario 3. Performance under load", () => { 

  describe(`Try to load the server with requests`, () => {
    
    it('Create 10000 new users', done => {
        const requester = chai.request(server).keepOpen();
        const requests: Array<any> = [];

        for (let i = 0; i < 10000; i++) {            
            requests.push(requester
                            .post(API_ROUTE)
                            .send({name: 'Jill', hobbies: []})
            );
        }

        Promise.all(requests).then(() => {
            requester.close();
            done();
        });

    }).timeout(100000);

  });
});