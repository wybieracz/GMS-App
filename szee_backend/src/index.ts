import { Server } from './Server/Server';
require('dotenv').config();

class Launcher {

    private server: Server;

    constructor() {
        this.server = new Server();
    }
    
    public launchApp() {
        this.server.startServer();
    }
}

new Launcher().launchApp();