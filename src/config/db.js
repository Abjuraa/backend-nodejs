const mysql = require('mysql');
require('dotenv').config();
const connectDB = async () => {
    try {
        const connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            connectTimeout: 10000
        });

        console.log('Conexion exitosa a la base de datos');
        global.db = connection;
    } catch (error) {
        console.log('Error al conectar a la base de datos: ', error);
        process.exit(1);
    }
}

module.exports = connectDB;