"use strict";
const user_1 = require('../schemas/user');
const mongoose = require('mongoose');
//
// let MONGODB_CONNECTION: string = "mongodb://localhost:27017/expressDB";
// let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
const User = mongoose.model("User", user_1.userSchema);
class UserController {
    constructor() {
    }
    retrieve(req, res, next) {
        // INclude logic to get many objects here
        User.find((err, Users) => {
            if (err) {
                res.json({ info: 'error during find Users', error: err });
            }
            ;
            res.json({ info: 'Users found successfully', data: Users });
        });
    }
    create(req, res, next) {
        var newUser = new User(req.body);
        newUser.save((err) => {
            if (err) {
                res.json({ info: 'error during User create', error: err });
            }
            res.json({ info: 'User saved successfully', data: newUser });
        });
    }
}
exports.UserController = UserController;
const userController = new UserController();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userController;
