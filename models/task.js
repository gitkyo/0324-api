//model des taches avec sequelize
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Task = sequelize.define("task",  {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },    
        completed: {
            type: DataTypes.BOOLEAN,
        },
        //add owner to task qui fait référence à l'id de l'utilisateur
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
            ref: {
                model: 'User',
                key: 'id'
            }
        }
    },
    {   //option avoir les colonnes createdAt et updatedAt
        createdAt: true, 
        updatedAt: true        
    }

); 

