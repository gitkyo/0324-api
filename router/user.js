//import express
import express from "express";

//create a router
export const userRouter = express.Router();

//import controller
import { getAllUser, getUserById } from '../controllers/user.js'

//route get sur l'url /tasks pour obtenir toutes les taches
userRouter.get('/users', (req, res) => {
    getAllUser(req, res);
})

//route get sur l'url /tasks/id pour obtenir une tache en fonction de son id
userRouter.get('/users/:id', (req, res) => {
    getUserById(req, res);
})