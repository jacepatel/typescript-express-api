import * as mocha from "mocha";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import { UserController } from "../../src/controllers/userController";
import * as sinon from "sinon";

import app from "../../src/App";

chai.use(chaiHttp);
const expect = chai.expect;
const userController = new UserController;

describe("UserController", () => {
  describe("Retrieve", function() {
    it("should respond", function() {
      let req,res,next,spy;
      req = res = next = {};
      spy = res.send = sinon.spy();
      userController.retrieve(req, res, next);
      expect(spy.calledOnce).to.equal(true);
    });
  });
});
