import mysql from "mysql2";
import dotenv from "dotenv";
 
dotenv.config();
 
// TODO
// Create the pool to connect to the database
// Use the database settings from the .env file

export const pool = mysql.createPool(
    {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "week6db",
    }
).promise();


