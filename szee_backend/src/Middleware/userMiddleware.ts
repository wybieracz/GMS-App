import { compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import User from "../Models/User";

export async function checkUserId(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params.userId);
  if(!userId) return res.status(400).send('Bad userId parameter.');
  return next();
}

export async function checkMail(req: Request, res: Response, next: NextFunction) {
  const email = req.body.email;
  if(!email) return res.status(400).send('Missing mail parameter.');

  const emailRegExp = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if(!emailRegExp.test(email)) return res.status(400).send('Bad mail parameter.');

  const user = await User.findOne({
    where: { email: {[Op.eq]: email}}
  })
  if(user) return res.status(409).send('This email address is already being used. Use other email address.');
  next();
}

export async function checkPassword(req: Request, res: Response, next: NextFunction) {
  const password = req.body.password;
  if(!password) return res.status(400).send('Missing password parameter.');

  const passwordRegExp = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/);
  if(!passwordRegExp.test(password)) return res.status(400).send('The password should have 8 or more characters including lowercase and uppercase letters, a number and a special character.');

  next();
}

export async function checkPasswordCredential(req: Request, res: Response, next: NextFunction) {
  try {
    const oldPassword = req.body.password;
    const user = await User.findOne({
      where: { id: res.locals.userId }
    })
    if(!user) return res.status(400).send('Unknown user.');
    const hashMatch = await compare(oldPassword, user.hash);
    if(!hashMatch) return res.status(400).send('Bad credentials.');
    next();
  } catch {
    return res.status(400).send('Something went wrong.');
  }
  
}