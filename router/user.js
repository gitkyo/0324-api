//import express
import express from "express";

//create a router
export const userRouter = express.Router();

//import controller
import { getAllUser, getUserById, postUser, deleteUserById, loginUser, logoutUser } from '../controllers/user.js'
import { auth } from "../middleware/auth.js";

//route get sur l'url /tasks pour obtenir toutes les taches
userRouter.get('/users', (req, res) => {
    getAllUser(req, res);
})

//route get sur l'url /tasks/id pour obtenir une tache en fonction de son id
userRouter.get('/users/:id', (req, res) => {
    getUserById(req, res);
})

//route post sur /users pour poster un utilisateur
userRouter.post('/users', (req, res) => {
    postUser(req, res);
})

//route delete /users/id pour supprimer un utilisateur
userRouter.delete('/users/:id', (req, res) => {
    deleteUserById(req, res);
})

//route /login pour se connecter
userRouter.post('/login', (req, res) => {
    loginUser(req, res);
})

//route /logout pour se déconnecter
userRouter.post('/logout', auth, (req, res) => {
    logoutUser(req, res);
})