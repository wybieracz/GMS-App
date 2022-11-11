import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import Device from "../Models/Device";

export async function checkCredentials(req: Request, res: Response, next: NextFunction) {
  const id = req.body.id;
  const connectionString = req.body.connectionString;

  // const device = await Device.findOne({
  //   where: { id: {[Op.eq]: id}}
  // })
  // if(!user) return res.status(400).send('Bad credentails.');

  // const hashMatch = await compare(password, user.hash);
  // if(!hashMatch) return res.status(400).send('Bad credentails.');

  // res.locals = { userId: user.id };
  // console.log(res.locals)
  next();
}