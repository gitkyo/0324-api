//model des taches avec sequelize
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

//export user model
export const User = sequelize.define("user", {
    name: {
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
                args: [7, 50],
                msg: "Password must be between 7 and 50 characters"
            },
            notContains: {
                args: "password",
                msg: "Password cannot contain the word password"
            }
        }
    },    
    }, {
        // timestamps: false,
        createdAt: false,
        updatedAt: false        
    }
);


