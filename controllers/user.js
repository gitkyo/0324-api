//import model user
import { User } from '../models/user.js';

//get User data - SELECT / READ of CRUD
export const getAllUser = async (req, res) => {
    try {
        //le mathode findAll() permet de récupérer tous les enregistrements de la table
        const users = await User.findAll();

        if(!users) {
            res.status(404).send('no users found')
        }

        res.status(200).send(users);

    } catch (error) {        
        res.send(error) 
    }
}

export const getUserById = async (req, res) => {
    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id        

        //get Task By Id  with the orm sequelize and find with where clause
        const user = await User.findAll({
            where: {
                id: id
            }
        }); 

        if(!user) {
            res.status(404).send('no users found')
        }

        res.status(200).send(user);
    } catch (error) {
        res.send(error)
    }
}

