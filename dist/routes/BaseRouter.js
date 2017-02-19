"use strict";
const express_1 = require('express');
class BaseRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', this.baseResponse);
    }
    baseResponse(req, res, next) {
        // Return some data
        let returnData = {
            message: 'Hello World!'
        };
        res.send(returnData);
    }
}
exports.BaseRouter = BaseRouter;
const baseRoutes = new BaseRouter();
baseRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = baseRoutes.router;
