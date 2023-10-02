//import express
import express from "express";

//create a router
export const taskRouter = express.Router();

//import controller
import { getAlltask, getTaskById, postTaskById } from '../controllers/task.js'

//route get sur l'url /tasks pour obtenir toutes les taches
taskRouter.get('/tasks', (req, res) => {
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