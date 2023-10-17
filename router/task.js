//import express
import express from "express";
import { auth } from "../middleware/auth.js";

//create a router
export const taskRouter = express.Router();

//import controller
import { getAlltask, getTaskById, postTaskById, deleteTaskById, editTaskById } from '../controllers/task.js'

//route get sur l'url /tasks pour obtenir toutes les taches
taskRouter.get('/tasks', auth, (req, res) => {
    getAlltask(req, res);
})

//route du controller « getTaskById » qui prend en parametre l’id d’une tâche.
taskRouter.get('/tasks/:id', (req, res) => {    
    getTaskById(req, res);
})

//route du controller postTaskById 
taskRouter.post('/tasks/:id', (req, res) => {
    postTaskById(req, res);
})

//route du controller deleteTaskById
taskRouter.delete('/tasks/:id', (req, res) => {
    deleteTaskById(req, res);
})

//route du controller editTaskById
taskRouter.put('/tasks/:id', (req, res) => {
    editTaskById(req, res);
})