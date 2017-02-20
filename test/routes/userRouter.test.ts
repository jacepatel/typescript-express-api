import * as mocha from "mocha";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as sinon from "sinon";
import { UserController } from "../../src/controllers/userController";

import app from "../../src/App";

chai.use(chaiHttp);
const expect = chai.expect;

describe("GET api/v1/users", () => {

  // beforeEach(function() {
  //     sinon.spy("IUserModel", "find");
  //   });

  // it("should call the UserController for retrieve", () => {
  //   let retrieve = sinon.stub(UserController, "retrieve");
  //   chai.request(app).get("/api/v1/users");
  //   sinon.assert.calledOnce(retrieve);
  // });

  // it("should include first user", () => {
  //   return chai.request(app).get("/api/v1/users")
  //     .then(res => {
  //       let FoundUser = res.body.find(object => object.id === 1);
  //       expect(FoundUser).to.exist;
  //       expect(FoundUser).to.have.all.keys([
  //         "id"
  //       ]);
  //     });
  // });

});
