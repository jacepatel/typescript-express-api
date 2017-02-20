import * as mocha from "mocha";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as sinon from "sinon";
import { UserController } from "../../src/controllers/userController";
import * as User from "../../src/models/user";
import app from "../../src/App";

chai.use(chaiHttp);
const expect = chai.expect;
describe("UserRoutes", () => {
  describe("GET api/v1/users", () => {
    // Before each test we empty the database
    beforeEach((done) => {
      User.remove({}, (err) => {
        done();
      });
    });

    it("should call the UserController for retrieve and return no objects", (done) => {
      chai.request(app)
      .get("/api/v1/users").end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a("array");
        res.body.data.length.should.be.eql(0);
      done();
      });
    });

    it("should include first user", (done) => {
      let userEmail = "an@email.com";
      let user = new User({email: userEmail});
      user.save((err, user) => {
        chai.request(app).get("/api/v1/users").end((err, res) => {
          let data = res.body.data;
          data.length.should.be.eql(1);
          data[0].email.should.eql(userEmail);
          done();
        });
      });
    });
  });
});
