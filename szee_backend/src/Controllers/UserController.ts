import { Request, Response } from "express";
import * as umd from '../Middleware/userMiddleware';
import * as mmd from '../Middleware/mainMiddleware'
import * as dmd from '../Middleware/deviceMiddleware'
import UserService from "../Services/UserService";
import { Controller } from "./MainController";
import { IDeviceCredentials } from "../Models/Device";

class UserController extends Controller {

  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  private getUser(req: Request, res: Response) {
    this.userService.getUser(res.locals.userId)
    .then(result => res.send(result))
    .catch(err => res.status(400).end());
  }

  private addDevice(req: Request, res: Response) {
    const credentials: IDeviceCredentials = req.body;
    this.userService.addDevice(credentials, res.locals.userId)
    .then(result => res.send(result))
    .catch(err => res.status(400).end());
  }

  private removeDevice(req: Request, res: Response) {
    const id: string = req.params.id;
    this.userService.removeDevice(id)
    .then(result => res.send(result))
    .catch(err => res.status(408).end());
  }

  private changePassword(req: Request, res: Response) {
    this.userService.changePassword(req.body, res.locals.userId)
    .then(result => res.send(result))
    .catch(err => res.status(408).end());
  }

  protected routes() {
    this.router.get('', mmd.checkSession, this.getUser.bind(this));
    this.router.post('/device', mmd.checkSession, dmd.checkCredentials, dmd.registerIfOnline, this.addDevice.bind(this));
    this.router.delete('/device/:id', mmd.checkSession, dmd.checkDevAssignment, this.removeDevice.bind(this));
    this.router.patch('/password', mmd.checkSession, umd.checkPasswordCredential, umd.checkPassword, this.changePassword.bind(this))
  }
}

export default new UserController().router;