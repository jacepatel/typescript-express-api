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

describe("GET api/v1/users", () => {

  it("should call the UserController for retrieve and return no objects", () => {
    chai.request(app)
    .get("/api/v1/users").then(res => {
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body.length.should.be.eql(1);
    });
  });

  it("should include first user", () => {
    let User: Model<IUserModel> = DataAccess.mongooseConnection.model<IUserModel>("User", userSchema);
    let user = new User({email: "an@email.com"});
    user.save(book => {
      chai.request(app).get("/api/v1/users")
      .then(res => {
        let FoundUser = res.body.find(object => object.id === 1);
        expect(FoundUser).to.exist;
        expect(FoundUser).to.have.all.keys([
          "id", "email"
        ]);
        expect(FoundUser.email).to.equal("an@email.com")
      });
    });
  });

});
