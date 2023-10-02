/**
 * Fichier principal de l'application
*/

import {getAlltask, getTaskFromIdUser, getTaskFromNameUser, editDescTaskByID, editAllTaskByNameUser, deleteTaskByID, addTaskFromNameUser} from './controllers/task.js'
import {customApiController} from './controllers/custom-api.js'
// getAlltask()

//ici j'appelle la fonction getTaskFromIdUser avec en parametre 1
// getTaskFromIdUser(1) 

// getTaskFromNameUser('toto')

// editDescTaskByID(7, 'apprendre toujours et toujours')

// editAllTaskByNameUser('titi', 'apprendre un max !!')

// deleteTaskByID(7)

// addTaskFromNameUser('toto', 'apprendre un maxi !!')


// Debut de mon serveur express
import express from 'express'

// Je crée une instance de mon serveur express
const app = express()

// Je défini le port sur lequel mon serveur va écouter
const port = 3000

//indiquer a express qu'on peut insérer des donnée au format json
app.use(express.json())

//indiquer a espress qu'on utilise un routeur
import {taskRouter} from './router/task.js'
app.use(taskRouter)



//route get sur l'url /
app.get('/', (req, res) => {
    // envoi du texte hello world
    // res.send('Hello World!')

    //envoi de json
    // res.json({message: 'Hello World!'})

    //envoi de html
    res.send('<h1>Hello World!</h1>') 

})

//route /api pour afficher une api distante que j'ai altéré
app.get('/custom-api', async (req, res) => {
    customApiController(req, res); 
})


//demarrage du serveur
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})






