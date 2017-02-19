"use strict";
const mongoose = require("mongoose");
exports.mongoose = mongoose;
const user_1 = require('../schemas/user');
//import mockgoose = require("mockgoose");
mongoose.Promise = global.Promise;
let MONGODB_CONNECTION = "mongodb://localhost:27017/expressDB";
mongoose.createConnection(MONGODB_CONNECTION);
mongoose.model('User', user_1.userSchema);
// if (process.env.NODE_ENV === "testing") {
//     mockgoose(mongoose).then((): void => { mongoose.connect("mongodb://example.com/TestingDB") });
// } else {
// }
