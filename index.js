/**
 * Fichier principal de l'application
*/
import {customApiController} from './controllers/custom-api.js'
import helmet from "helmet";
import { RateLimiterMemory } from "rate-limiter-flexible";
import bodyParser from 'body-parser';
import apicache from 'apicache'
import cors from 'cors'

// Debut de mon serveur express
import express from 'express' 

// Je crée une instance de mon serveur express
export const app = express()

// Je défini le port sur lequel mon serveur va écouter
const port = 3000

//cors
app.use(cors())

//here we cached all routes
// let cache = apicache.middleware;
// app.use(cache('5 minutes'));

// set the request size limit to 1 MB
app.use(bodyParser.json({ limit: '1mb' }));

// Use Helmet to avoid security issues with unsafe-eval option
app.use(
    helmet({
      contentSecurityPolicy: false,
    })
);

//rate limiter to avoid brute force attack
const rateLimiter = new RateLimiterMemory({
    points: 10, // maximum number of requests allowed
    duration: 1, // time frame in seconds
  });
const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(req.ip)
    .then(() => {
        // request allowed, 
        // proceed with handling the request
        next();
    })
    .catch(() => {
        // request limit exceeded, 
        // respond with an appropriate error message
        res.status(429).send('Too Many Requests');
    });
};
app.use(rateLimiterMiddleware);

//indiquer a express qu'on peut insérer des donnée au format json
app.use(express.json())

//indiquer a express qu'on peut insérer des donnée au format form data
app.use(express.urlencoded({ extended: true }))

//set var to get path directory
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
const publishDirectoryPath = path.join(__dirname, './public')

//set public directory
app.use(express.static(publishDirectoryPath))

//indiquer a express qu'on peut utiliser le moteur de template ejs
app.set('view engine', 'ejs') 

//indiquer a espress qu'on utilise un routeur
import {taskRouter} from './router/task.js'
import {userRouter} from './router/user.js'
app.use(taskRouter) 
app.use(userRouter)



//route get sur l'url /
app.get('/', (req, res) => {
    // envoi du texte hello world
    // res.send('Hello World!')

    //envoi de json
    // res.json({message: 'Hello World!'})

    //envoi de html
    // res.send('<h1>Hello World!</h1>') 

    res.render('index', {title: 'Accueil'})

})

//route /api pour afficher une api distante que j'ai altéré
app.get('/custom-api', async (req, res) => {
    customApiController(req, res); 
})

//middleware pour la page 404
app.use((req, res) => {
    res.status(404).send(
        "<style>body{background: url(https://httpstatusdogs.com/img/404.jpg) no-repeat center center fixed #000000;}</style>")
})

//demarrage du serveur
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})






