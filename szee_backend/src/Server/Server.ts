import express, { Application } from 'express';
import swaggerUi from "swagger-ui-express";
import cors from 'cors';
import MainController from '../Controllers/MainController';
import UserController from '../Controllers/UserController';


export class Server {

    private port: string | undefined;
    private app: Application;

    constructor() {
        this.port = process.env.APP_PORT || '8000';
        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();
    }

    private configureMiddleware() {
        this.app.use(express.json());
        this.app.use(express.static("public"));
        this.app.use(cors());
        this.app.use(
            "/docs",
            swaggerUi.serve,
            swaggerUi.setup(undefined, { swaggerOptions: { url: "/swagger.json" }})
        );
    }

    private configureRoutes() {
        this.app.use('/user', UserController);
    }

    public startServer() {
        this.app.listen(this.port, () => {
            console.log(`App is running on port ${this.port}`);
        });
    }
}