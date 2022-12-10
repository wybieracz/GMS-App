import cors from 'cors';
import express, { Application } from 'express';
import { Sequelize } from 'sequelize-typescript';
import swaggerUi from "swagger-ui-express";
import MainController from '../Controllers/MainController';
import UserController from '../Controllers/UserController';
import getDBClient from '../Database/dbClient';
import cookieParser from 'cookie-parser'
import DeviceController from '../Controllers/DeviceController';
require('dotenv').config({ path: './../.env' });

export class Server {

    private port: string | undefined;
    private app: Application;
    private dbClient: Sequelize;

    constructor() {
        this.port = process.env.APP_PORT;
        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();
        this.dbClient = getDBClient();
    }

    private configureMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
        this.app.use(cookieParser())
        this.app.use(
            "/docs",
            swaggerUi.serve,
            swaggerUi.setup(undefined, { swaggerOptions: { url: "/swagger.json" }})
        );
    }

    private configureRoutes() {
        this.app.use('/', MainController);
        this.app.use('/user', UserController);
        this.app.use('/device', DeviceController);
    }

    public startServer() {
        this.app.listen(this.port, () => {
            console.log(`App is running on port ${this.port}`);
        });
    }
}