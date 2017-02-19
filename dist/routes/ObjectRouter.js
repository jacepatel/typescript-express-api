"use strict";
const express_1 = require('express');
// This objects constant is a file - should be replaced with a DB connection
const Objects = [{ 'id': 1 }];
class ObjectRouter {
    /**
     * Initialize the ObjectRouter
     * objects
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all objects.
     */
    getAll(req, res, next) {
        // INclude logic to get many objects here
        res.send(Objects);
    }
    getOne(req, res, next) {
        // Include logic to get an object here
        let query = parseInt(req.params.id);
        let foundObject = Objects.find(hero => hero.id === query);
        if (!foundObject) {
            res.status(404).send("Sorry can't find that!");
        }
        else {
            res.send(foundObject);
        }
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
    }
}
exports.ObjectRouter = ObjectRouter;
// Create the ObjectRouter, and export its configured Express.Router
const objectRoutes = new ObjectRouter();
objectRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = objectRoutes.router;
