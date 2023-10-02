/**
 * Fichier de control pour les taches (controller) 
 * ici les fonctions qui sont exporté sont accessible depuis les autres fichiers * 
 */

import {db} from '../db.js'

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