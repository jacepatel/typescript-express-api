import {Router, Request, Response, NextFunction} from 'express';

export class BaseRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/', this.baseResponse);
  }

  public baseResponse(req: Request, res: Response, next: NextFunction) {
    // Return some data
    let returnData = {
      message: 'Hello World!'
    }
    res.send(returnData);
  }
}

const baseRoutes = new BaseRouter();
baseRoutes.init();
export default baseRoutes.router;
