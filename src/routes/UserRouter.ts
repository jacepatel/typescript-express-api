import {Router, Request, Response, NextFunction} from "express";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";
import jwt = require("express-jwt");

export class UserRouter {
  router: Router;
  private _userController: UserController;
  private _authController: AuthController;
  private _auth: {};

  constructor() {
    this.router = Router();
    this._userController = new UserController();
    this._authController = new AuthController();
    this.init();
  }

  init() {
    let userController = this._userController;
    let authController = this._authController;
    this.router.get("/", userController.retrieve);
    this.router.get("/:id", userController.retrieveOne);
    this.router.post("/", userController.create);
    this.router.post("/auth/register", authController.register);
  }

  // This is used for
  // authenticationInit() {
  //   this._auth = jwt({
  //     secret: "MY_SECRET",
  //     userProperty: "payload"
  //   });
  // }
}

const objectRoutes = new UserRouter();
objectRoutes.init();

export default objectRoutes.router;
