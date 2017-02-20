import * as passport from "passport";
import * as User from "../models/user";
import { IReturnData } from "../interfaces/ReturnData"
import {Router, Request, Response, NextFunction} from "express";

export class AuthController {
  constructor() {
  }

  register(req: Request, res: Response, next: NextFunction) {
    let newUser = new User(req.body);
    let returnData: IReturnData;
    newUser.setPassword(req.body.password);
    newUser.save((err) => {
      if (err) {
          returnData = {info: "error during User create", error: err};
      } else {
        let token = newUser.generateJwt();
        res.status(200);
        returnData = {info: "User saved successfully", data: newUser, token: token};
      }
      res.send(returnData);
    });
  }

  login(req: Request, res: Response, next: NextFunction) {
    let returnData: IReturnData;
    passport.authenticate("local", function(err, user, info){
      if (err) {
        res.status(404);
        returnData = {info: "error during login", error: err};
        return;
      }
      let token: string;
      if (user) {
        token = user.generateJwt();
        res.status(200);
        returnData = {token: token, info: "login was successful", data: user}
        res.json({
          "token" : token
        });
      } else {
        res.status(401)
        returnData = {info: "User with that email and password was not found"}
      }
      res.send(returnData);
    })
  };
}
