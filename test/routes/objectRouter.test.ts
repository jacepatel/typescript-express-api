import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/objects', () => {

  it('responds with JSON array', () => {
    return chai.request(app).get('/api/v1/objects')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(1);
      });
  });

  it('should include first object', () => {
    return chai.request(app).get('/api/v1/objects')
      .then(res => {
        let Wolverine = res.body.find(object => object.id === 1);
        expect(Wolverine).to.exist;
        expect(Wolverine).to.have.all.keys([
          'id'
        ]);
      });
  });

});

describe('GET api/v1/objects/:id', () => {

  it('responds with a single object', () => {
    return chai.request(app).get('/api/v1/objects/1')
      .then(res => {
        let IndividualObject = res.body;
        expect(IndividualObject).to.exist;
        expect(IndividualObject.id).to.equal(1);
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
