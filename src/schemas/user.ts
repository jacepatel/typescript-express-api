import { Schema } from "mongoose";
import * as crypto from "crypto";
import * as jsonwebtoken from "jsonwebtoken";

export const userSchema: Schema = new Schema({
  createdAt: Date,
  updatedAt: Date,
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: String,
  lastName: String,
  hash: String,
  salt: String
});
userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};
userSchema.methods.validPassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  return this.hash === hash;
};
userSchema.methods.generateJwt = function() {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  let t = expiry.getTime();
  t = Math.round(t);

  return jsonwebtoken.sign({
    _id: this._id,
    email: this.email,
    exp: Math.round(t / 1000),
  }, "MY_SECRET");
  // TODO Get a secret here
};
userSchema.pre("save", function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  this.updatedAt = new Date();
  next();
});
