import { Request, Response, Router } from 'express';
import * as mmd from '../Middlewares/mainMiddleware';
import * as umd from '../Middlewares/userMiddleware';
import { ICredentials } from '../Models/Auth';
import { IUser } from '../Models/User';
import MainService from '../Services/MainService';
import UserService from '../Services/UserService';

export abstract class Controller {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  protected abstract routes(): void;
}

class MainController extends Controller {
  
  private mainService: MainService;

  constructor() {
    super();
    this.mainService = new MainService();
  }

  private register(req: Request, res: Response) {
    const userData: IUser = req.body;
    this.mainService.register(userData)
    .then(result => res.status(201).send(result))
    .catch(err => res.status(400));
  }

  private login(req: Request, res: Response) {
    const credentials: ICredentials = req.body;
    this.mainService.login(credentials, res.locals.userId)
    .then(result => res.cookie("token", result, { maxAge: 60 * 60 * 1000, httpOnly: false, secure: false, sameSite: 'none' }).status(200).end())
    .catch(err => res.status(400));
  }

  private logout(req: Request, res: Response) {
    const userId = req.body.id;
    this.mainService.logout(userId)
    .then(result => res.cookie("token", result, { maxAge: 0, httpOnly: false, secure: false, sameSite: 'none' }).status(200).end())
    .catch(err => res.status(400));
  }

  protected routes() {
    this.router.post('/register', umd.checkMail, umd.checkPassword, this.register.bind(this));
    this.router.post('/login', mmd.checkCredentials, this.login.bind(this));
    this.router.post('/logout', this.logout.bind(this));
  }
}

export default new MainController().router;