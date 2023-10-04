//import express
import express from "express";

//create a router
export const userRouter = express.Router();

//import controller
import { getAllUser } from '../controllers/user.js'

//route get sur l'url /tasks pour obtenir toutes les taches
userRouter.get('/users', (req, res) => {
    getAllUser(req, res);
})