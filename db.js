/**
 * Fichier permettant de se connecter à la base de donnée
*/

//load env variables
import dotenv from 'dotenv';
dotenv.config();
/*
//cette ligne me permet d'importer le module mysql : https://www.npmjs.com/package/mysql
import mysql from 'mysql'

//Connection to MySQL database 
// ici on créer une vairbale nommé db qui va contenir notre acces à la BDD
export const db = mysql.createConnection({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
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
*/
//connexion à la base de donnée avec ORM sequelize
import { Sequelize } from 'sequelize';

export const sequelize  = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT
    }
  );

