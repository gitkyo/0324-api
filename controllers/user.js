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
        console.log(error)
    }
}

