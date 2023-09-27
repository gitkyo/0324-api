//console.log permet d'afficher des message dans le terminal (cote backend)
console.log("coucou ceci est un test de connexion à mysql")

//cette ligne me permet d'importer le module mysql : https://www.npmjs.com/package/mysql
import mysql from 'mysql'

//Connection to MySQL database 
// ici on créer une vairbale nommé db qui va contenir notre acces à la BDD
const db = mysql.createConnection({
  user: 'root',
  password: '',
  host: 'localhost',
  database: '0324',
});

//ici on créer un try catch pour gérer les erreurs
try{   

    // ici j'appelle la fonction db pour me connecter à la base de donnée
    db.connect((err) => {

        //si j'ai une erreur je l'affiche dans le terminal
        if (err) {
            throw err;
        }

        //sinon tout va bien je suis connecté
        console.log('Connected to database');
    });

//si une erreur est attrapé je l'affiche dans le terminal
}catch(error){
    console.log(error)
}



//get Task data
const getAlltask = () => {     

    try{
        //on utilise la varibale db pour effectuer une requete SQL qui récupére toutes les taches
        db.query("SELECT * FROM task ", (error, result) => {       
        
            if (error) {
            throw error
        }    
            console.log(result)
        }); 

    }catch(error){
        console.log(error)
    }

   
}
//ici une fonction nommé getTaskFromIdUser qui prend en parametre un id
const getTaskFromIdUser = (id) => {
    db.query("SELECT * FROM task WHERE owner = ?", [id], (error, result) => {
        if (error) {
            console.log(error)
        }    
            console.log(result)
        }); 
}

const getTaskFromNameUser = (name) => {
    db.query("SELECT * FROM task INNER JOIN user ON task.owner = user.id where user.nom = ?", [name], (error, result) => {
        if (error) {
            console.log(error)
        }    
            console.log(result)
        }); 
}
// getAlltask()
//ici j'appelle la fonction getTaskFromIdUser avec en parametre 1
// getTaskFromIdUser(1)
// getTaskFromNameUser('toto')



