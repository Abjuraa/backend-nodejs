const mysql = require('mysql2');
require('dotenv').config();

const connectDB = async () => {
    const connection = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        connectTimeout: 10000
    });

    return new Promise((resolve, reject) => {
        connection.getConnection((err, conn) => {
            if (err) {
                console.error("Error al conectar a la base de datos", err);
                if (conn) conn.release();
                reject(err);
                process.exit(1);
            } else {
                console.log("Conexión exitosa a la base de datos");
                conn.release();
                global.db = connection;
                resolve(connection);
            }
        })
    })

}

module.exports = connectDB;