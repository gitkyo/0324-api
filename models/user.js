//model des taches avec sequelize
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Task } from './task.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import process from 'process';


//export user model
export const User = sequelize.define("user", {
    nom: {
        type: DataTypes.STRING,
        allowNull: true,
        trim: true
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: true,
        validate: {
            isInt: {
                args: true,
                msg: "Age must be a number"
            },            
            min: {
                args: 1,
                msg: "Age must be greater than 0"
            },           
        }
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true,
        trim: true,
        validate: {
            isEmail: {
                args: true,
                msg: "Email is invalid"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
            len: {
                args: [7, 100],
                msg: "Password must be between 7 and 100 characters"
            },
            notContains: {
                args: "password",
                msg: "Password cannot contain the word password"
            }
        }
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    //add token to user
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    }    
    }, {
        // timestamps: false,
        createdAt: false,
        updatedAt: false        
    }
);



//add methode destroyAllTask
User.destroyAllTask = async (id) => {   
    const countTasksDeleted = await Task.destroy({
        where: {
            owner: id
        }
    })
    return countTasksDeleted;
}

User.verfifyCredtential = async (req) =>{
    
    //on récupére l'id de la tache dans l'url
    const email = req.body.email
    const password = req.body.password  

    //get Task By Id  with the orm sequelize and find with where clause
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    
    if(!user) throw new Error('Unable to login')
       
    const isMatch = await bcrypt.compare(password, user.password);    
    if(!isMatch) throw new Error('Unable to login')
    
    return user
}


User.generateAuthToken = async (user) => {        
    
    //génération du token avec la méthode sign de jwt        
    const token = jwt.sign({'id' : user.id.toString()}, process.env.JWT_KEY)  
    
    //ajout du token à l'utilisateur
    user.token = token;
    
    //sauvegarde de l'utilisateur en bdd
    await user.save()

    //retour du token
    return token;
}

