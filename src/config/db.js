const mysql = require("mysql2")
require('dotenv').config();

//Configuración de la conexión a la base de datos
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
})

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    }

    if (connection) {
        console.log("Conexion exitosa a la base de datos");
        connection.release();
    }
})

module.exports = pool;