import { Request, Response } from "express";
import * as dmd from '../Middlewares/deviceMiddleware';
import * as mmd from '../Middlewares/mainMiddleware';
import * as tmd from '../Middlewares/telemetryMiddleware';
import TelemetryService from "../Services/TelemetryService";
import { Controller } from "./MainController";

class TelemetryController extends Controller {

  private telemetryService: TelemetryService;

  constructor() {
    super();
    this.telemetryService = new TelemetryService();
  }

  private getDeviceTelemetryPerDay(req: Request, res: Response) {
    this.telemetryService.getDeviceTelemetryPerDay(res.locals.device, res.locals.year, res.locals.month, res.locals.day)
    .then(result => res.send(result))
    .catch(err => res.status(400));
  }

  private getDeviceTelemetry(req: Request, res: Response) {
    this.telemetryService.getDeviceTelemetry(res.locals.device)
    .then(result => res.send(result))
    .catch(err => res.status(400));
  }

  private getLatestKWh(req: Request, res: Response) {
    this.telemetryService.getLatestKWh(res.locals.userId)
    .then(result => res.send(result))
    .catch(err => res.status(400));
  }

  private getTelemetry(req: Request, res: Response) {
    this.telemetryService.getTelemetry(res.locals.userId, res.locals.year, res.locals.month)
    .then(result => res.send(result))
    .catch(err => res.status(400));
  }

  private getWeekTelemetry(req: Request, res: Response) {
    this.telemetryService.getWeekTelemetry(res.locals.userId)
    .then(result => res.send(result))
    .catch(err => res.status(400));
  }

  protected routes() {
    this.router.get('/device/:id/:year/:month/:day', mmd.checkSession, dmd.checkDevAssignment, tmd.checkYearMonthDay, this.getDeviceTelemetryPerDay.bind(this));
    this.router.get('/device/:id', mmd.checkSession, dmd.checkDevAssignment, this.getDeviceTelemetry.bind(this));
    this.router.get('/kwh', mmd.checkSession, this.getLatestKWh.bind(this));
    this.router.get('/week', mmd.checkSession, tmd.checkYearMonth, this.getWeekTelemetry.bind(this));
    this.router.get('/:year/:month', mmd.checkSession, tmd.checkYearMonth, this.getTelemetry.bind(this));
  }
}

export default new TelemetryController().router;