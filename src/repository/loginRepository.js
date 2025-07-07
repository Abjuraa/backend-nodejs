const db = require("../config/db");
const util = require("util")
const query = util.promisify(db.query).bind(db);

const bcrypt = require('bcryptjs');


exports.registrar = async (usuario) => {
    const hashPassword = bcrypt.hashSync(usuario.password)
    const sql = "INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)";
    const values = [
        usuario.nombre,
        usuario.apellido,
        usuario.email,
        hashPassword
    ];

    const results = query(sql, values);
    return results
}

exports.ingresar = async (usuario) => {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        const values = [
            usuario.email
    ];
    const results = await query(sql, values);
    return results[0];

}

exports.obtenerUsuarios = async () => {
    const sql = "SELECT * FROM usuarios";
    const results = await query(sql);
    return results
}

exports.verificarEmail = async (email) => {
    const sql = "SELECT nombre, apellido, email FROM usuarios WHERE email = ?";
    const result = await query(sql, [email]);
    return result[0];
}