"use strict";
const chai = require("chai");
const chaiHttp = require("chai-http");
const App_1 = require("../../src/App");
chai.use(chaiHttp);
const expect = chai.expect;
describe('GET api/v1/users', () => {
    it('responds with JSON array', () => {
        return chai.request(App_1.default).get('/api/v1/users')
            .then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(1);
        });
    });
    it('should include first user', () => {
        return chai.request(App_1.default).get('/api/v1/users')
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
        return chai.request(App_1.default).get('/api/v1/objects/')
            .then(res => {
            let objects = res.body;
            expect(objects).to.exist;
            expect(objects.count > 0).to.equal(true);
        });
    });
});
