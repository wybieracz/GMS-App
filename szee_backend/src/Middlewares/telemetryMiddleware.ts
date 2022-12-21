import { NextFunction, Request, Response } from "express";

export async function checkYearMonth(req: Request, res: Response, next: NextFunction) {
  try {
    const year = parseInt(req.params.year as string);
    const month = parseInt(req.params.month as string);
    res.locals = { ...res.locals, year: year, month: month };
  } catch {
    return res.status(401).send('Bad year or month parameter.');
  }
  next();
}

export async function checkYearMonthDay(req: Request, res: Response, next: NextFunction) {
  try {
    const year = parseInt(req.params.year as string);
    const month = parseInt(req.params.month as string);
    const day = parseInt(req.params.day as string);
    res.locals = { ...res.locals, year: year, month: month, day: day };
  } catch {
    return res.status(401).send('Bad year or month or day parameter.');
  }
  next();
}