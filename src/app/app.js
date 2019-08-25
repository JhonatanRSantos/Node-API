import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routes from "./router/router";

class AppController {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();                 
    }    
    initEnv() {
        dotenv.config({
            path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
        });
    }

    middlewares() {
        this.express.use(cors());
        this.express.use(express.json());
    }

    routes() {
        this.express.use(routes);
    }
}

module.exports = new AppController().express;