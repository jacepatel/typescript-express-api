"use strict";
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const ObjectRouter_1 = require("./routes/ObjectRouter");
const BaseRouter_1 = require("./routes/BaseRouter");
const UserRouter_1 = require("./routes/UserRouter");
const DataAccess = require("./config/database");
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.db_config();
        this.routes();
    }
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        this.express.use('/', BaseRouter_1.default);
        this.express.use('/api/v1/objects', ObjectRouter_1.default);
        this.express.use('/api/v1/users', UserRouter_1.default);
    }
    db_config() {
        global.Promise = require("q").Promise;
        const MONGODB_CONNECTION = "mongodb://localhost:27017/heros";
        let connection = DataAccess.mongooseConnection;
    }
    ;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
