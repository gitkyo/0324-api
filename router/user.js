//import express
import express from "express";

//create a router
export const userRouter = express.Router();

//import des controllers
import { 
    getAllUser, 
    getUserById, 
    postUser, 
    deleteUserById, 
    updateUserById, 
    upload, 
    uploadAvatar, 
    loginUser, 
    logoutUser,
    deleteAvatar,
    getAvatar } from '../controllers/user.js'
import { auth } from "../middleware/auth.js";








/**
 * @api {get} /users GET all users
 * @apiDescription Get current user from the database
 * @apiName GetUsers
 * @apiGroup User
 * @apiVersion 0.2.23
**/ 
userRouter.get('/users', auth,(req, res) => {
    getAllUser(req, res);
})






/**
 * @api {get} /users/:id GET user by id
 * @apiDescription Get current user from the database
 * @apiName GetUser
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiParam {Number} id Users unique ID  
 * 
 */
userRouter.get('/users/:id', auth,(req, res) => {
    getUserById(req, res);
})









/**
 * @api {post} /users POST user
 * @apiDescription Get current user from the database
 * @apiName PostUser
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiBody {String} [nom] Users unique nom
 * @apiBody {Number} [age] Users unique age
 * @apiBody {String} email Users unique email
 * @apiBody {String} password Users unique password
 * 
 * @apiParamExample {json} Request-Example:
    {
        "nom": "kuku",
        "age": 25,
        "email": "yiyi@uiui.com",
        "password": "123456"
    }   
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
    {
        "id": 18,
        "nom": "kuku",
        "age": 25,
        "email": "yiyi@uiui.com",
        "password": "$2b$10$IzchCR8mqdKU3CDikeCQIOpA/Wcp6UXoFN/C9qVifwCB4eUfKKv42"
    }
 */
userRouter.post('/users', (req, res) => {
    postUser(req, res);
})






/**
 * @api {delete} /users/:id DELETE user by id
 * @apiDescription Get current user from the database
 * @apiName DeleteUser
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiParam {Number} id Users unique ID
 * 
 */
userRouter.delete('/users/:id', auth,(req, res) => {
    deleteUserById(req, res);
})







/**
 * @api {patch} /users/:id PATCH user by id
 * @apiDescription Get current user from the database
 * @apiName PatchUser
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiParam {Number} id Users unique ID
 * 
 * @apiBody {String} [nom] Users unique nom
 * @apiBody {Number} [age] Users unique age
 * @apiBody {String} [email] Users unique email
 * @apiBody {String} [password] Users unique password
 * 
 */
userRouter.patch('/users/:id', auth, (req, res) => {
    updateUserById(req, res);
})






/**
 * @api {post} /login POST login
 * @apiDescription Get current user from the database
 * @apiName PostLogin
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiBody {String} email Users unique email
 * @apiBody {String} password Users unique password
 * 
 * @apiParamExample {json} Request-Example:
    {
        "email":"yiyi@uiui.com",
        "password" : "123456"
    }
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
    {
    "user": {
        "id": 18,
        "nom": "kuku",
        "age": 25,
        "email": "yiyi@uiui.com",
        "password": "$2b$10$IzchCR8mqdKU3CDikeCQIOpA/Wcp6UXoFN/C9qVifwCB4eUfKKv42",
        "avatar": null,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4IiwiaWF0IjoxNjk4MDU1NDM1fQ.tYrQ4MfD3Ev2f80lou-SOqc3PBkZT6THeCzvQ3StRC0"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4IiwiaWF0IjoxNjk4MDU1NDM1fQ.tYrQ4MfD3Ev2f80lou-SOqc3PBkZT6THeCzvQ3StRC0"
    }
 *   
 */
userRouter.post('/login', (req, res) => {
    loginUser(req, res);
})

/**
 * @api {post} /logout POST logout
 * @apiDescription Get current user from the database
 * @apiName PostLogout
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 */
userRouter.post('/logout', auth, (req, res) => {
    logoutUser(req, res);
})






/**
 * @api {post} /users/:id/avatar POST avatar
 * @apiDescription Get current user from the database
 * @apiName PostAvatar
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiParam {Number} id Users unique ID
 * 
 * @apiBody {File} avatar Users unique avatar
 */
userRouter.post('/users/:id/avatar', auth, upload.single('avatar'), (req, res) => {         
    uploadAvatar(req, res);   
}) 





/**
 * @api {delete} /users/:id/avatar DELETE avatar
 * @apiDescription Get current user from the database
 * @apiName DeleteAvatar
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiParam {Number} id Users unique ID
 * 
 */
userRouter.delete('/users/:id/avatar', auth, (req, res) => {         
    deleteAvatar(req, res);   
})






/**
 * @api {get} /users/:id/avatar GET avatar
 * @apiDescription Get current user from the database
 * @apiName GetAvatar
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiParam {Number} id Users unique ID
 */
userRouter.get('/users/:id/avatar', auth, (req, res) => {         
    getAvatar(req, res);
})
