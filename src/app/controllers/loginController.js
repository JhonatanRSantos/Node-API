import { user, valid_tokens } from "../models";
import jwt from "jsonwebtoken";

const SECRET = "qwerty";

class LoginController {
    auth = async (req, res) => {
        try {
            const { email, password } = req.body.user;
            const response = await user.findOne({ 
                attributes: { exclude: ["password", "createdAt", "updatedAt", "phone"] },
                where : { email, password } 
            });
            if(!response)
                return res.status(400).send({ message: "User not found."});            
            response.dataValues.token = jwt.sign({ id : response.id }, SECRET, { expiresIn: 600 });
            await this.__setToken(response.dataValues);
            return res.status(200).send(response);
        } catch (error) {
            return res.status(500).send({ message : "Unknown error, try agian.", error });
        }        
    }
    __setToken = async (currentUser) => {
        try {
            const { id: user_id, token } = currentUser;
            let expiration = new Date();
            expiration.setTime(expiration.getTime() + 600000 )
            await valid_tokens.create({ user_id, token, expiration });
            return true;
        } catch (error) {
            return false;
        }
    }
}
module.exports = new LoginController();