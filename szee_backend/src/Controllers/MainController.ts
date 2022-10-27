import { Router, Request, Response } from 'express';
import { Route, Get, Path } from "tsoa";

export abstract class Controller {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  protected abstract routes(): void;
}

@Route("")
class MainController extends Controller {
  private static BASE_URL = '/';

  constructor() {
    super();
  }

  private main(req: Request, res: Response) {
    res.render('Grid Management System', {
      title: 'GMS'
    });
  }

  protected routes() {
    this.router.get('/', this.main.bind(this));
  }
}

export default new MainController().router;