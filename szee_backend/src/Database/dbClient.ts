import { Sequelize } from "sequelize-typescript";
import User from "../Models/User";
import Device from "../Models/Device";
import Telemetry from "../Models/Telemetry";
import { dbConfig } from "./dbConfig";

const sequelize = new Sequelize(dbConfig);
sequelize.addModels([User, Device, Telemetry]);
sequelize.sync();

export default function getDBClient(): Sequelize {
  sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`);
  }).catch((err) => {
    console.log(err);
  })
  return sequelize;
}
