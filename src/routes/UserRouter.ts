import {Router, Request, Response, NextFunction} from 'express';
import { IModel } from '../models/model'
import { IUserModel } from '../models/user'
import { userSchema } from '../schemas/user'
import { UserController } from '../controllers/userController'

export class UserRouter {
  router: Router
  private _userController: UserController

  constructor() {
    this.router = Router();
    this._userController = new UserController();
    this.init();
  }

  init() {
    var controller = this._userController;
    this.router.get('/', controller.retrieve);
    this.router.post('/', controller.create);
  }
}

const objectRoutes = new UserRouter();
objectRoutes.init();

export default objectRoutes.router;
