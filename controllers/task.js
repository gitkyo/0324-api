/**
 * Fichier de control pour les taches (controller) 
 * ici les fonctions qui sont exporté sont accessible depuis les autres fichiers * 
 */

/*
import {db} from '../db.js'
ici il faudra revoir toutes ces fonctions avec l'ORM sequelize
*/ 
//import model task
import { Task } from '../models/task.js';


//get Task data - SELECT / READ of CRUD
export const getAlltask = async (req, res) => {     
   
    try {
        //select all record of table task
        const tasks = await Task.findAll();

        if(!tasks) {
            res.status(404).send('no tasks found')
        }

        res.send(tasks);       

        /*         
        //on utilise la varibale db pour effectuer une requete SQL qui récupére toutes les taches
        db.query("SELECT * FROM task ", (error, result) => {       
        
            if (error) throw error
            
            //si on a pas d'erreur on renvoi dans la réponse
            res.send(result)
            // console.log(result)
        });  
        */
    } catch (error) {
        res.send(error)
    }   
}

//get Task data from id SELECT / READ of CRUD
export const getTaskById = async (req, res) => {

    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id        

        //get Task By Id  with the orm sequelize and find with where clause
        const task = await Task.findAll({
            where: {
                id: id
            }
        }); 

        if(!task) {
            res.status(404).send('no tasks found')
        }

        res.status(200).send(task);
        
        /*
        //on utilise la varibale db pour effectuer une requete SQL qui récupére la tache avec l'id
        db.query("SELECT * FROM task WHERE id = ?", [id], (error, result) => {
            if (error) throw error
            
            //si on a pas d'erreur on renvoi dans la réponse
            res.send(result)
            // console.log(result)
        });
        */
    } catch (error) {
        res.send(error)
    }    
}

// INSERT / CREATE of CRUD
export const postTaskById = async (req, res) => {
    
    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id
        const description = req.body.description
        const completed = req.body.completed
        
        //postTaskById with the orm
        const task = await Task.create({
            description: description,
            completed: completed,
            owner: id
        });

        if(!task) {
            res.status(404).send('cannot create task')
        }

        res.status(201).send(task);

        /*
        //insert task table from id
        db.query("INSERT INTO task (description, completed, owner) VALUES (?, ?, ?)", [description, completed, id], (error, result) => {
            if (error) throw error
            
            //si on a pas d'erreur on renvoi dans la réponse
            res.status(201).send(result)
            console.log(result)
        });       
        */    
    } catch (error) {
        res.send(error)
    }

}

// DELETE / DELETE of CRUD
export const deleteTaskById = async (req, res) => {
        
    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id

        // delete Task By Id with orm
        const task = await Task.destroy({
            where: {
                id: id
            }
        });

        if(!task) {
            res.status(404).send('task not found')
        }

        res.status(200).send('task deleted'); 


        /*
        //update task table from id
        db.query("DELETE FROM task WHERE id = ?", [id], (error, result) => {
            if (error) throw error
            
            //si on a pas d'erreur on renvoi dans la réponse
            res.status(201).send(result)
            console.log(result)
        });
        */
    } catch (error) {
        res.send(error)
    }
    
}
// PUT / UPDATE of CRUD
export const editTaskById = async (req, res) => {
        
    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id
        const description = req.body.description
        const completed = req.body.completed

        //edit task by id with orm
        const task = await Task.update({
            description: description,
            completed: completed
        }, {
            where: {
                id: id
            }
        });

        if(!task) {
            res.status(404).send('task not found')
        }

        res.status(200).send('task updated');

        /*
        //update task table from id
        db.query("UPDATE task SET description = ?, completed = ? WHERE id = ?", [description, completed, id], (error, result) => {
            if (error) throw error
            
            //si on a pas d'erreur on renvoi dans la réponse
            res.status(201).send(result)
            console.log(result)
        });
        */
    } catch (error) {
        res.send(error)
    }
    
}

/*
    ANCIEN CONTROLLER AVEC MYSQL QUI NE SONT PLUS UTILISEE

//ici une fonction nommé getTaskFromIdUser qui prend en parametre un id
export const getTaskFromIdUser = (id) => {
    db.query("SELECT * FROM task WHERE owner = ?", [id], (error, result) => {
        if (error) {
            console.log(error)
        }    
            console.log(result)
        }); 
}

export const getTaskFromNameUser = (name) => {
    db.query("SELECT * FROM task INNER JOIN user ON task.owner = user.id where user.nom = ?", [name], (error, result) => {
        if (error) {
            console.log(error)
        }    
        console.log(result)
        //boucle result pour afficher les taches
        // for (let i = 0; i < result.length; i++) {
        //     console.log(result[i].description)
        // }

        //boucle result pour afficher les taches
        // result.forEach(element => {
        //     console.log(element.description)
        // });
        }); 
}

export const editDescTaskByID = (id, description) => {

    //regex to avoid SQL injection
    const regex = /['"\/\\]/g;
    description = description.  replace(regex, '');    
    
    db.query("UPDATE task SET description = ? WHERE id = ?", [description, id], (error, result) => {
    if (error) {
        console.log(error)
    }    
        console.log(result.message)
    }); 
}

export const editAllTaskByNameUser = (name, description) => {

    //regex to avoid SQL injection
    const regex = /['"\/\\]/g;
    description = description.  replace(regex, '');    
    
    //get user id from name
    db.query("SELECT id FROM user WHERE nom = ?", [name], (error, result) => {
        if (error) {
            console.log(error)
        }    

        const id = result[0].id       
                
        //with id update task
        db.query("UPDATE task SET description = ? WHERE owner = ?", [description, id], (error, result) => {
            if (error) {
                console.log(error) 
            }    
            console.log(result.message)
        });
    });
}

export const deleteTaskByID = (id) => {
    db.query("DELETE FROM task WHERE id = ?", [id], (error, result) => {
        if (error) {
            console.log(error)
        }    
        console.log("task with id "+id+" deleted")
    });  
}

export const addTaskFromNameUser = (name, description) => {
    
        //regex to avoid SQL injection
        const regex = /['"\/\\]/g;
        description = description.  replace(regex, '');    
        
        //get user id from name
        db.query("SELECT id FROM user WHERE nom = ?", [name], (error, result) => {
            if (error) {
                console.log(error)
            }    
    
            const id = result[0].id       
                    
            //with id update task
            db.query("INSERT INTO task (description, owner) VALUES (?, ?)", [description, id], (error, result) => {
                if (error) {
                    console.log(error) 
                }    
                console.log(result)
            });
        });
    }
*/