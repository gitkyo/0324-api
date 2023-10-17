//import model user
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

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

export const postUser = async (req, res) => {
    try {

        //hash password - 10 fait référence au nombre de tour de hashage. On peut l'ajouter au fichier .env      
        const hashedPassword = await bcrypt.hash(req.body.password, 10);        

        const user = await User.create({
            nom: req.body.nom,
            age: req.body.age,
            email: req.body.email,
            password: hashedPassword
        });        

        if(!user) {
            res.status(404).send('no users found')
        }

        res.status(200).send(user);
    } catch (error) {
        res.send(error)
    }
}

export const deleteUserById = async (req, res) => {
    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id        
                
        //call user method to delete all tasks asociated with the current user
        const countTasksDeleted = await User.destroyAllTask(id);        

        //get Task By Id  with the orm sequelize and find with where clause
        const user = await User.destroy({
            where: {
                id: id
            }
        }); 

        if(!user) {
            res.status(404).send('no users found')
        }

        res.status(200).send("user deleted and " + countTasksDeleted + " task deleted");
    } catch (error) { 
        res.send(error)
    }
}

export const updateUserById = async (req, res) => {
    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id        

        const options = {}

        if(req.body.nom) options.nom = req.body.nom
        if(req.body.age) options.age = req.body.age
        if(req.body.email) options.email = req.body.email
        if(req.body.password) options.password = req.body.password

        //if options is empty then throw new error
        if(Object.keys(options).length === 0) throw "Pas de valeurs";
             
        //get Task By Id  with the orm sequelize and find with where clause
        const user = await User.update(
            options, {
            where: {
                id: id
            }
        }); 

        if(!user) {
            res.status(404).send('no users found')
        }

        res.status(200).send("user maj");
    } catch (error) {
        res.send(error)
    }
}

export const loginUser = async (req, res) => {
    try {
        //appel de la méthode verfifyCredtential pour checker si l'utilisateur existe en BDD
        const user = await User.verfifyCredtential(req)        

        //Si oui, génération du token via la méthode generateAuthToken
        const token = await User.generateAuthToken(user)

        //on ajouter dans les headers le fameux token sous le champs "Authorization", il sera conservé côté client dans les cookies avec une durée de vie TTL
        res.setHeader('Authorization', token);    

        //le header Access-Control-Expose-Headers permet d'exposer le header Authorization
        res.setHeader('Access-Control-Expose-Headers', 'authorization');        
 
        res.send({ user, token })   
             
    } catch (error) {
        res.status(400).send('error with login')
    }
   
}

export const logoutUser = async (req, res) => {
    try {
        //on récupére le token dans le header de la requete
        const token = req.header('Authorization').replace('Bearer ', '')

        //on cherche l'utilisateur avec l'id et le token
        const user = await User.findOne({ 
            where: {
                id: req.user.id,
                token: token
            }
        })

        if (!user) {
            throw new Error()
        }

        //on supprime le token de l'utilisateur
        user.token = null;

        //on sauvegarde l'utilisateur en bdd
        await user.save()

        res.send('logout success')
    } catch (error) {
        res.status(500).send('error with logout')
    }
}

