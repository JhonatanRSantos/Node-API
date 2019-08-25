import { promisify } from "util";
import jwt from "jsonwebtoken";

import { valid_tokens } from "../models";

const SECRET = "qwerty";

class Middlewares {
    constructor() {
        this.verify = promisify(jwt.verify);        
    }
    auth = async (req, res, next) => {
        const { auth_token } = req.headers;
        if(!auth_token) {
            return res.status(401).send({ message : "No token provided."});
        }
        const expression = new RegExp("/deleteUser|/updateUser");
        const needsSameId = expression.test(req.originalUrl);
        try {
            const { id } = await this.verify(auth_token, SECRET);
            if(needsSameId && (id !== parseInt(req.body.id)))
                return res.status(401).send({ message : "Unauthorized. You can not edit this user." });    
            const response = await valid_tokens.findOne({ where : { user_id: id, token: auth_token } });
            if(response)
                return next();
            return res.status(401).send({ message : "Unauthorized."});
        } catch (error) {
            return res.status(401).send({ message : error });
        }        
    }
}
module.exports = new Middlewares();