import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
// import * as mockgoose from "mockgoose";
import BaseRouter from "./routes/BaseRouter";
import UserRouter from "./routes/UserRouter";
import DataAccess = require("./config/database");
import localPassport = require("./config/passport");
import * as mongoose from "mongoose";
import * as passport from "passport";
// Creates and configures an ExpressJS web server.

// interfaces
import * as User from "./models/user";

class App {
  // ref to Express instance
  public express: express.Application;
  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.db_config();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(passport.initialize());
    // mount cookie parser here if needed
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use("/", BaseRouter);
    this.express.use("/api/v1/users", UserRouter);
  }

  public db_config() {
    global.Promise = require("q").Promise;
    // mongoose.Promise = global.Promise;
    const MONGODB_CONNECTION: string = "mongodb://localhost:27017/heros";
    let connection: mongoose.Connection = DataAccess.mongooseConnection;
  };
}

export default new App().express;
