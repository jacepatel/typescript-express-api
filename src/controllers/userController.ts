import {Router, Request, Response, NextFunction} from "express";
import { IUserModel } from "../models/user";
import { userSchema } from "../schemas/user";
import { Model } from "mongoose";
import DataAccess = require("../config/database");
import { IReturnData } from "../../src/interfaces/ReturnData";

const User: Model<IUserModel> = DataAccess.mongooseConnection.model<IUserModel>("User", userSchema);

export class UserController {
  constructor() {
  }

  retrieve(req: Request, res: Response, next: NextFunction) {
    let returnData: IReturnData;
    User.find((err, Users) => {
        if (err) {
          returnData = {info: "error during find Users", error: err};
        } else {
          returnData = {info: "Users found successfully", data: Users};
        };
        res.send(returnData);
    });
  }

  create(req: Request, res: Response, next: NextFunction) {
    let newUser = new User(req.body);
    // TODO: Make this an interface
    let returnData: IReturnData;
    newUser.save((err) => {
        if (err) {
            returnData = {info: "error during User create", error: err};
        } else {
          returnData = {info: "User saved successfully", data: newUser};
        }
        res.send(returnData);
    });
  }

  retrieveOne(req: Request, res: Response, next: NextFunction) {
    // INclude logic to get many objects here
    let id = parseInt(req.params.id);
    let query = { id: id };
    let returnData: IReturnData;
    User.findOne(query, (err, User) => {
        if (err) {
            returnData = {info: "error during find Users", error: err};
        };
        if (User) {
            returnData = {info: "User found successfully", data: User};
        } else {
            returnData = {info: "User not found with id:" + id};
        }
        res.send(returnData);
    });
  }
}

const userController = new UserController();

export default userController;
