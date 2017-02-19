"use strict";
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const ObjectRouter_1 = require('./routes/ObjectRouter');
const BaseRouter_1 = require('./routes/BaseRouter');
const UserRouter_1 = require('./routes/UserRouter');
const mongoose = require("mongoose"); //import mongoose
//schemas
const user_1 = require("./schemas/user"); //import userSchema
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.model = Object();
        this.express = express();
        this.middleware();
        this.db_config();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        //mount cookie parser here if needed
    }
    // Configure API endpoints.
    routes() {
        this.express.use('/', BaseRouter_1.default);
        this.express.use('/api/v1/objects', ObjectRouter_1.default);
        this.express.use('/api/v1/users', UserRouter_1.default());
    }
    db_config() {
        global.Promise = require("q").Promise;
        // mongoose.Promise = global.Promise;
        const MONGODB_CONNECTION = "mongodb://localhost:27017/heros";
        let connection = mongoose.createConnection(MONGODB_CONNECTION);
        //create models
        this.model.user = connection.model("User", user_1.userSchema);
    }
    ;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
