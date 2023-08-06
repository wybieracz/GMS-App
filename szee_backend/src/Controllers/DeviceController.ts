import { Request, Response } from "express";
import * as mmd from '../Middleware/mainMiddleware'
import * as dmd from '../Middleware/deviceMiddleware'
import { Controller } from "./MainController";
import DeviceService from "../Services/DeviceService";
import { Status } from "../Models/Device";

class DeviceController extends Controller {

  private deviceService: DeviceService;

  constructor() {
    super();
    this.deviceService = new DeviceService();
  }

  private getDevices(req: Request, res: Response) {
    this.deviceService.getDevices(res.locals.userId)
    .then(result => res.send(result))
    .catch(err => res.status(400).end());
  }

  private getDevice(req: Request, res: Response) {
    this.deviceService.getDevice(res.locals.device)
    .then(result => res.send(result))
    .catch(err => res.status(400).end());
  }

  private setSettings(req: Request, res: Response) {
    this.deviceService.setSettings(req.body, res.locals.device)
    .then(result => res.send(result))
    .catch(err => res.status(400).end());
  }

  private setMode(req: Request, res: Response) {
    this.deviceService.setMode(req.body, res.locals.device)
    .then(result => {
      if(result.status === Status.Offline) res.status(404).send(result)
      else res.send(result)
    })
    .catch(err => res.status(400).end());
  }

  protected routes() {
    this.router.get('', mmd.checkSession, this.getDevices.bind(this));
    this.router.get('/:id', mmd.checkSession, dmd.checkDevAssignment, this.getDevice.bind(this));
    this.router.post('/:id/settings', mmd.checkSession, dmd.checkDevAssignment, this.setSettings.bind(this));
    this.router.post('/:id/mode', mmd.checkSession, dmd.checkDevAssignment, dmd.checkRules, this.setMode.bind(this));
  }
}

export default new DeviceController().router;