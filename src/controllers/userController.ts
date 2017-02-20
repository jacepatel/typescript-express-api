import {Router, Request, Response, NextFunction} from "express";
import { IUserModel } from "../models/user";
import { userSchema } from "../schemas/user";
import { Model } from "mongoose";
import DataAccess = require("../config/database");

const User: Model<IUserModel> = DataAccess.mongooseConnection.model<IUserModel>("User", userSchema);

export class UserController {
  constructor() {
  }

  retrieve(req: Request, res: Response, next: NextFunction) {
    // INclude logic to get many objects here
    User.find((err, Users) => {
        if (err) {
            res.json({info: "error during find Users", error: err});
        };
        res.json({info: "Users found successfully", data: Users});
    });
    res.send();
  }

  create(req: Request, res: Response, next: NextFunction) {
    let newUser = new User(req.body);
    newUser.save((err) => {
        if (err) {
            res.json({info: "error during User create", error: err});
        }
        res.json({info: "User saved successfully", data: newUser});
    });
    res.send();
  }

  retrieveOne(req: Request, res: Response, next: NextFunction) {
    // INclude logic to get many objects here
    let id = parseInt(req.params.id);
    let query = { id: id };
    User.findOne(query, (err, User) => {
        if (err) {
            res.json({info: "error during find Users", error: err});
        };
        if (User) {
            res.json({info: "User found successfully", data: User});
        } else {
            res.json({info: "User not found with id:" + id});
        }
    });
    res.send();
  }
}

const userController = new UserController();

export default userController;
