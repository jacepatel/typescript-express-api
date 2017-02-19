import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';

import app from '../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/users', () => {

  // beforeEach(function() {
  //     sinon.spy('IUserModel', 'find');
  //   });

  it('responds with JSON array', () => {
    return chai.request(app).get('/api/v1/users')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(1);
      });
  });

  it('should include first user', () => {
    return chai.request(app).get('/api/v1/users')
      .then(res => {
        let FoundUser = res.body.find(object => object.id === 1);
        expect(FoundUser).to.exist;
        expect(FoundUser).to.have.all.keys([
          'id'
        ]);
      });
  });

});

describe('GET api/v1/objects/', () => {

  it('responds with a single object', () => {
    return chai.request(app).get('/api/v1/objects/')
      .then(res => {
        let objects = res.body;
        expect(objects).to.exist;
        expect(objects.count > 0).to.equal(true);
      });
  });

  // This test is waiting on the latest release with update to fix this
  // it('responds with a 404', () => {
  //   return chai.request(app).get('/api/v1/objects/2')
  //     .then(res => {
  //       res.should.have.status(400);
  //     });
  // });
});
