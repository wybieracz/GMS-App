import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import User from "../Models/User";
import { compare } from "bcrypt";
import { JwtPayload, verify } from "jsonwebtoken";

declare module 'express' {
  interface Response{
    locals: any
  }
}

export async function checkCredentials(req: Request, res: Response, next: NextFunction) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    where: { email: {[Op.eq]: email}}
  })
  if(!user) return res.status(400).send('Bad credentials.');

  const hashMatch = await compare(password, user.hash);
  if(!hashMatch) return res.status(400).send('Bad credentials.');

  res.locals = { userId: user.id };
  next();
}

export async function checkSession(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;
    const decoded = verify(token, process.env.JWT_KEY) as JwtPayload;
    res.locals = { userId: decoded.id };
  } catch {
    return res.status(401).send('Session expired.');
  }
  next();
}