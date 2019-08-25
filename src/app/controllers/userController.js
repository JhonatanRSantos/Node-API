import { user } from "../models";

class UserController {
    async addUser(req, res) {
        try {
            const { name, email } = await user.create(req.body.user);            
            return res.status(201).send({ 
                message : "Success.", 
                user : { name, email } 
            });
        } catch (error) {            
            return res.status(500).send({ message : "Unknown error, try agian." });
        }        
    }
    async listUsers(req, res) {
        try {
            const response = await user.findAll({
                attributes: { exclude: ["id", "password", "createdAt", "updatedAt"] }
            });
            return res.status(201).send({ message : "Success.", users: response });
        } catch (error) {
            return res.status(500).send({ message : "Unknown error, try agian.", error });
        }        
    }
    async updateUser(req, res) {
        try {
            const { id, update } = req.body;
            const [ response ] = await user.update(update, { where: { id } });            
            
            if(response === 0)
                return res.status(400).send({ message : "User not found." });
            return res.status(200).send({ message : "Success." });
        } catch (error) {
            return res.status(500).send({ message : "Unknown error, try agian.", error });
        }        
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.body;
            const response = await user.destroy({ where: { id } });
            if(response === 0)
                return res.status(400).send({ message: "User not found." });
            return res.status(200).send({ message: "Success." });
        } catch (error) {
            return res.status(500).send({ message : "Unknown error, try agian.", error });
        }        
    }
}

module.exports = new UserController();