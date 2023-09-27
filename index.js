console.log("coucou ceci est un test de connexion à mysql")

//connexion avec mysql
import mysql from 'mysql'
//Connection to MySQL database    
const db = mysql.createConnection({
  user: 'root',
  password: '',
  host: 'localhost',
  database: '0324',
});

// test connexion
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

//get Task data
const getAlltask = () => {
     //on ajoute les données dans la base de données sans ORM
    db.query("SELECT * FROM task ", (error, result) => {
    if (error) {
        console.log(error)
    }    
        console.log(result)
    }); 
}

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
// getTaskFromIdUser(1)
// getTaskFromNameUser('toto')



