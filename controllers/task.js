/**
 * Fichier de control pour les taches (controller) 
 * ici les fonctions qui sont exporté sont accessible depuis les autres fichiers * 
 */

/*
import {db} from '../db.js'
ici il faudra revoir toutes ces fonctions avec l'ORM sequelize
*/ 


//get Task data
export const getAlltask = async (req, res) => {     
   
    try {
        //on utilise la varibale db pour effectuer une requete SQL qui récupére toutes les taches
        db.query("SELECT * FROM task ", (error, result) => {       
        
            if (error) throw error
            
            //si on a pas d'erreur on renvoi dans la réponse
            res.send(result)
            // console.log(result)
        });  
    } catch (error) {
        res.send(error)
    }   
}

//get Task data from id
export const getTaskById = async (req, res) => {

    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id

        //on utilise la varibale db pour effectuer une requete SQL qui récupére la tache avec l'id
        db.query("SELECT * FROM task WHERE id = ?", [id], (error, result) => {
            if (error) throw error
            
            //si on a pas d'erreur on renvoi dans la réponse
            res.send(result)
            // console.log(result)
        });
    } catch (error) {
        res.send(error)
    }
    
}


export const postTaskById = async (req, res) => {
    
    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id
        const description = req.body.description
        const completed = req.body.completed
        
        //insert task table from id
        db.query("INSERT INTO task (description, completed, owner) VALUES (?, ?, ?)", [description, completed, id], (error, result) => {
            if (error) throw error
            
            //si on a pas d'erreur on renvoi dans la réponse
            res.status(201).send(result)
            console.log(result)
        });       
                   
    } catch (error) {
        res.send(error)
    }

}

export const deleteTaskById = async (req, res) => {
        
    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id
        
        //update task table from id
        db.query("DELETE FROM task WHERE id = ?", [id], (error, result) => {
            if (error) throw error
            
            //si on a pas d'erreur on renvoi dans la réponse
            res.status(201).send(result)
            console.log(result)
        });
        
    } catch (error) {
        res.send(error)
    }
    
}

export const editTaskById = async (req, res) => {
        
    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id
        const description = req.body.description
        const completed = req.body.completed
        
        //update task table from id
        db.query("UPDATE task SET description = ?, completed = ? WHERE id = ?", [description, completed, id], (error, result) => {
            if (error) throw error
            
            //si on a pas d'erreur on renvoi dans la réponse
            res.status(201).send(result)
            console.log(result)
        });
        
    } catch (error) {
        res.send(error)
    }
    
}


// old

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