require('dotenv').config();

import { Server } from './Server/Server';
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