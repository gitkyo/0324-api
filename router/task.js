//import express
import express from "express";

//create a router
export const taskRouter = express.Router();

//import controller
import { getAlltask } from '../controllers/task.js'

//route get sur l'url /tasks pour obtenir toutes les taches
taskRouter.get('/tasks', (req, res) => {
    getAlltask(req, res);
})