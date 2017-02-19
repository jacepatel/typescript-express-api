"use strict";
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this._userController = new userController_1.UserController();
        this.init();
    }
    init() {
        var controller = this._userController;
        this.router.get('/', controller.retrieve);
        this.router.post('/', controller.create);
    }
}
exports.UserRouter = UserRouter;
const objectRoutes = new UserRouter();
objectRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = objectRoutes.router;
