import "mocha";
import { IUser } from "../../src/interfaces/user";
import * as User from "../../src/models/user";

// require chai and use should() assertions
let chai = require("chai");
chai.should();

describe("User", function() {

  describe("create()", function () {
    it("should create a new User", function () {
      // user object
      let user: IUser = {
        email: "foo@bar.com",
        firstName: "Brian",
        lastName: "Love"
      };

      // create user and return promise
      return new User(user).save().then(result => {
        // verify _id property exists
        result._id.should.exist;

        // verify email
        result.email.should.equal(user.email);

        // verify firstName
        result.firstName.should.equal(user.firstName);

        // verify lastName
        result.lastName.should.equal(user.lastName);
      })
    });
  });
});
