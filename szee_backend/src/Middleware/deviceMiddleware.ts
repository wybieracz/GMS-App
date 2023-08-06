import { compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import Device from "../Models/Device";
import axios from "../Utils/axios";

export async function checkCredentials(req: Request, res: Response, next: NextFunction) {
  const id = req.body.id;
  const connectionString = req.body.connectionString;

  if(id.length !== 6 && connectionString.length !== 12) return res.status(400).send('Bad credentials.');

  const device = await Device.findByPk(id);
  if(!device) return res.status(400).send('Bad credentials.');
  if(device.userId === res.locals.userId) return res.status(409).send('This device is already assigned to your account.')
  if(device.userId) return res.status(403).send('This device is assigned to other account.')

  const hashMatch = await compare(connectionString, device.hash);
  if(!hashMatch) return res.status(400).send('Bad credentials.');

  next();
}

export async function checkDevAssignment(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const userId = res.locals.userId;

  if(id.length !== 6) return res.status(400).send('Bad device id.');

  const device = await Device.findOne({ where: { id: id, userId: userId }});
  if(!device) return res.status(400).send('Cannot find your device.');

  res.locals = { ...res.locals, device: device };

  next();
}

export async function registerIfOnline(req: Request, res: Response, next: NextFunction) {
  
  const id = req.body.id;

  await axios
    .post(id + '/methods?' + process.env.API_VERSION, 
      { methodName: "setRegistered", 
        responseTimeoutInSeconds: 5, 
        payload: 1
      }
    )
    .then((res: { data: any, status: any }) => { 
      if(res.data.status === 200) {
        next();
      } else {
        return res.status(400).send('Something went wrong.');
      }
    })
    .catch((err: any) => {
      console.log(err)
      return res.status(404).send('Device is currently offline.');
    })
}

function ifHoursIncorrect(rules: Array<number>) {
  for(let i = 0; i < rules.length; i = i + 5) {
    if((rules[1 + i] === rules[3 + i] && rules[2 + i] >= rules[4 + i]) || (rules[1 + i] > rules[3 + i])) return true;
  }
  return false
}

export function checkRules(req: Request, res: Response, next: NextFunction) {
  
  switch(req.body.mode) {
    case 3: if(req.body.rules.length % 5 !== 0 || ifHoursIncorrect(req.body.rules)) return res.status(400).send('Bad rules.'); break;
    case 2: if(req.body.rules.length !== 2) return res.status(400).send('Bad rules.'); break;
    default: if(req.body.rules.length !== 1) return res.status(400).send('Bad rules.'); break;
  }

  next();
}