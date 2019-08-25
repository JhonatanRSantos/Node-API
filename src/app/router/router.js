import Router from "express";

import Middlewares from "../middlewares/middlewares";
import LoginController from "../controllers/loginController";
import UserController from "../controllers/userController";

class RouterController {
    constructor(){
        this.routes = Router();
        this.initRoutes();
    }    
    initRoutes() {
        this.routes.post("/auth", LoginController.auth);
        this.routes.post("/addUser", UserController.addUser);
        this.routes.use(Middlewares.auth);
        this.routes.get("/listUsers", UserController.listUsers);
        this.routes.put("/updateUser", UserController.updateUser);
        this.routes.delete("/deleteUser", UserController.deleteUser);        
    }
}

module.exports = new RouterController().routes;