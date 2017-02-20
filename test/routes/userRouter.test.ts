import * as mocha from "mocha";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as sinon from "sinon";
import { UserController } from "../../src/controllers/userController";
import { IUser } from "../../src/interfaces/user";
import { IUserModel } from "../../src/models/user";
import { userSchema } from "../../src/schemas/user";
import { Model } from "mongoose";
import DataAccess = require("../../src/config/database");

import app from "../../src/App";

chai.use(chaiHttp);
const expect = chai.expect;
const User: Model<IUserModel> = DataAccess.mongooseConnection.model<IUserModel>("User", userSchema);
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
