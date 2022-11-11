import { SequelizeOptions } from "sequelize-typescript";
require('dotenv').config();

export const dbConfig: SequelizeOptions = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  dialect: 'postgres',
  dialectOptions: { ssl: true }
};