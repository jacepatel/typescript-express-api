import {Router, Request, Response, NextFunction} from 'express';
// This objects constant is a file - should be replaced with a DB connection
const Objects = [{'id':1}];

export class ObjectRouter {
  router: Router

  /**
   * Initialize the ObjectRouter
   * objects
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all objects.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    // INclude logic to get many objects here
    res.send(Objects);
  }

  public getOne(req: Request, res: Response, next: NextFunction) {
    // Include logic to get an object here
    let query = parseInt(req.params.id);
    let foundObject = Objects.find(hero => hero.id === query);
    if(!foundObject) {
      res.status(404).send("Sorry can't find that!")
    } else {
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

// Create the ObjectRouter, and export its configured Express.Router
const objectRoutes = new ObjectRouter();
objectRoutes.init();

export default objectRoutes.router;
