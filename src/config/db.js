const mysql = require('mysql2');
require('dotenv').config();
const { Sequelize } = require('sequelize');
//Configuración de la base de datos
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000
})

//Verificación de la conexión
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error al conectar a la base de datos ", err);
        process.exit(1);
    }

    if (connection) {
        console.log("Conexion exitosa a la base de datos");
        connection.release();
    }
})

module.exports = pool;