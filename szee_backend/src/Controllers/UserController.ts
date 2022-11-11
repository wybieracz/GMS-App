import { Request, Response } from "express";
import * as umd from '../Middlewares/userMiddleware';
import * as mmd from '../Middlewares/mainMiddleware'
import UserService from "../Services/UserService";
import { Controller } from "./MainController";

class UserController extends Controller {

  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  private getUser(req: Request, res: Response) {
    this.userService.getUser(res.locals.userId)
    .then(result => res.send(result))
    .catch(err => res.status(400));
  }

  protected routes() {
    this.router.get('', mmd.checkSession, this.getUser.bind(this));
  }
}

export default new UserController().router;